import { Skeleton, Text } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { supabase } from "@/api/supabase";
import { ArticlePreview } from "@/components/article-preview";
import withSafeArea from "@/components/hoc/with-safe-area";

const PAGE_LIMIT = 5;

async function fetchArticles({ pageParam = 0 }) {
	const from = pageParam * PAGE_LIMIT;
	const to = from + PAGE_LIMIT - 1;

	// TODO: Filter by date

	const { data, error } = await supabase
		.from("articles")
		.select("id, title, content, source_id (name), category")
		.order("published_at", {
			ascending: false
		})
		.range(from, to);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

const Separator: React.FC = () => <View style={{ height: 32 }} />;

// TODO: Design
const FetchingIndicator: React.FC = () => (
	<View>
		<Text>Getting more news</Text>
	</View>
);

// TODO: Indicator showing infinite scroll that it is loading more items
// TODO: When last pages were [] then there is no more data and we should return undefined from getNextPageParam

const Tab: React.FC = () => {
	const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
		["daily-feed"],
		fetchArticles,
		{
			getNextPageParam: (_, pages) => Math.floor(pages.flatMap(page => page).length / PAGE_LIMIT)
		}
	);

	// NOTE: This is a premature optimization, I haven't tested real impact on performance.
	const articles = useMemo(() => data?.pages.flatMap(page => page), [data]);

	const onEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	if (isLoading) {
		// TODO: Improve skeleton

		return <Skeleton style={styles.skeleton} />;
	}

	if (isError) {
		// TODO: Inform user, and retry button (?)

		return <Text>Error</Text>;
	}

	return (
		<Fragment>
			<FlashList
				data={articles}
				keyExtractor={item => item.id}
				// @ts-ignore
				renderItem={({ item }) => <ArticlePreview {...item} />}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={styles.list}
				estimatedItemSize={200}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.25}
				ListFooterComponent={isFetchingNextPage ? FetchingIndicator : null}
			/>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		padding: 8
	},
	skeleton: {
		height: 320,
		width: "100%"
	}
});

export const NewsTab = withSafeArea(Tab, { edges: ["top"], style: styles.container });

NewsTab.displayName = "NewsTab";
