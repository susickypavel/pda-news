import { Text } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { supabase } from "@/api/supabase";
import { ArticlePreview } from "@/components/article-preview";

const PAGE_LIMIT = 5;

const Separator: React.FC = () => <View style={{ height: 32 }} />;

// TODO: Design
const FetchingIndicator: React.FC = () => (
	<View>
		<Text>Getting more news</Text>
	</View>
);

const EmptyList: React.FC = () => (
	<View>
		<Text>No news for today</Text>
	</View>
);

const ListEnd: React.FC = () => (
	<View>
		<Text>End of the list</Text>
	</View>
);

type ArticleFeedProps = {
	currentDate: Date;
};

export const ArticleFeed: React.FC<ArticleFeedProps> = ({ currentDate }) => {
	const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
		["daily-feed", currentDate.toDateString()],
		async ({ pageParam = 0 }) => {
			const from = pageParam * PAGE_LIMIT;
			const to = from + PAGE_LIMIT - 1;

			const start = new Date(currentDate);
			const end = new Date(currentDate);
			end.setHours(23, 59, 59, 999);

			const { data, error } = await supabase
				.from("articles")
				.select("id, title, content, source_id (name), category, published_at")
				.gte("published_at", start.toUTCString())
				.lte("published_at", end.toUTCString())
				.order("published_at", {
					ascending: false
				})
				.range(from, to);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
		{
			getNextPageParam: (lastPages, pages) => {
				if (lastPages.length < PAGE_LIMIT) {
					return undefined;
				}

				return Math.floor(pages.flatMap(page => page).length / PAGE_LIMIT);
			}
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
		return null;
	}

	if (isError) {
		// TODO: Inform user, and retry button (?)
		return <Text>Error</Text>;
	}

	return (
		<FlashList
			data={articles}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <ArticlePreview {...item} />}
			ListEmptyComponent={EmptyList}
			ItemSeparatorComponent={Separator}
			contentContainerStyle={styles.list}
			estimatedItemSize={200}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.25}
			ListFooterComponent={isFetchingNextPage ? FetchingIndicator : hasNextPage ? null : ListEnd}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		padding: 8
	}
});

ArticleFeed.displayName = "ArticleFeed";
