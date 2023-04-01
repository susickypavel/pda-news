import { Skeleton, Text } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/api/supabase";
import { ArticlePreview } from "@/components/article-preview";

const PAGE_LIMIT = 5;

async function fetchArticles({ pageParam = 0 }) {
	const from = pageParam * PAGE_LIMIT;
	const to = from + PAGE_LIMIT - 1;

	// TODO: Filter by date

	const { data, error } = await supabase
		.from("articles")
		.select("id, title, content, source_id (domain), category")
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

// TODO: Indicator showing infinite scroll that it is loading more items

export const NewsTab: React.FC = () => {
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

		return (
			<SafeAreaView style={styles.container} edges={["top"]}>
				<Skeleton
					style={{
						width: "100%",
						height: 320
					}}
				/>
			</SafeAreaView>
		);
	}

	if (isError) {
		// TODO: Inform user, and retry button (?)

		return (
			<SafeAreaView style={styles.container} edges={["top"]}>
				<Text>Error</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<FlashList
				data={articles}
				keyExtractor={item => item.id}
				// @ts-ignore
				renderItem={({ item }) => <ArticlePreview {...item} />}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={styles.list}
				estimatedItemSize={200}
				onEndReached={onEndReached}
				onEndReachedThreshold={0}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		padding: 8
	}
});

NewsTab.displayName = "NewsTab";
