import { Text } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";

import { supabase } from "@/api/supabase";
import { ArticlePreview } from "@/components/article-preview";
import { useAuth } from "@/context/auth";

const PAGE_LIMIT = 5;

export const ArticleFeedSeparator: React.FC = () => <View style={{ height: 32 }} />;

// TODO: Design
const FetchingIndicator: React.FC = () => (
	<View>
		<Text>Getting more news</Text>
	</View>
);

const EmptyList: React.FC = () => (
	<View style={styles.illustrationContainer}>
		<Image style={styles.illustration} source={require("@/assets/images/noNewsToday.png")} />
		<View style={{ width: "38%" }}>
			<Text style={{ fontWeight: "bold", fontSize: 25 }}>We are sorry!</Text>
			<Text style={{ paddingVertical: 6 }}>There are no news for this day.</Text>
			<Text>Choose another date to dive into hot topics!</Text>
		</View>
	</View>
);

const ListEnd: React.FC = () => (
	<View style={styles.illustrationContainer}>
		<Image style={styles.illustration} source={require("@/assets/images/endOfList.png")} />
		<View style={{ width: "38%" }}>
			<Text style={{ fontWeight: "bold", fontSize: 25 }}>Great job!</Text>
			<Text style={{ paddingVertical: 6 }}>You have finished all the news for this day.</Text>
			<Text>Come back tommorow for more stories!</Text>
		</View>
	</View>
);

type ArticleFeedProps = {
	currentDate: Date;
};

export const ArticleFeed: React.FC<ArticleFeedProps> = ({ currentDate }) => {
	const { user } = useAuth();
	const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
		["daily-feed", currentDate.toDateString()],
		async ({ pageParam = 0 }) => {
			const from = pageParam * PAGE_LIMIT;
			const to = from + PAGE_LIMIT - 1;

			const start = new Date(currentDate);
			const end = new Date(currentDate);
			end.setHours(23, 59, 59, 999);

			const { data, error } = await supabase
				.rpc("get_user_feed", {
					user_id: user.id
				})
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

	const articles = useMemo(() => data?.pages.flatMap(page => page) || [], [data]);

	const onEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	if (isLoading) {
		return null;
	}

	if (isError) {
		return <Text>Error</Text>;
	}

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			data={articles}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <ArticlePreview {...item} />}
			ListEmptyComponent={EmptyList}
			ItemSeparatorComponent={ArticleFeedSeparator}
			contentContainerStyle={styles.list}
			estimatedItemSize={200}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.25}
			ListFooterComponent={
				isFetchingNextPage ? FetchingIndicator : !hasNextPage && articles.length > 0 ? ListEnd : null
			}
		/>
	);
};

const styles = StyleSheet.create({
	illustration: {
		height: 250,
		resizeMode: "contain",
		width: "58%"
	},
	illustrationContainer: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row"
	},
	list: {
		padding: 8
	}
});

ArticleFeed.displayName = "ArticleFeed";
