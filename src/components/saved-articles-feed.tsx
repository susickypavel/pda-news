import { Text } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";

import { supabase } from "@/api/supabase";
import { useAuth } from "@/context/auth";

import { ArticleFeedSeparator } from "./article-feed";
import { ArticlePreview } from "./article-preview";

const NoBookmarks = () => (
	<View style={styles.illustrationContainer}>
		<Image style={styles.illustration} source={require("@/assets/images/noBookmarks.png")} />
		<View style={{ width: "38%" }}>
			<Text style={{ fontWeight: "bold", fontSize: 25 }}>You don&apos;t have any articles saved. </Text>
			<Text style={{ paddingTop: 6 }}>
				Go back exploring and save some articles so you can get back to them whenever you want!
			</Text>
		</View>
	</View>
);

export const SavedArticlesFeed: React.FC = () => {
	const { user } = useAuth();
	const { data, isLoading, isError, refetch, isRefetching } = useQuery(["saved-articles", user.id], async () => {
		const response = await supabase.rpc("get_user_saved_articles", {
			user_id: user.id
		});

		return response.data;
	});

	if (isError) return null;

	if (isLoading) return null;

	return (
		<View style={styles.container}>
			<FlashList
				showsVerticalScrollIndicator={false}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <ArticlePreview {...item} is_bookmarked={true} />}
				contentContainerStyle={styles.list}
				estimatedItemSize={10}
				onEndReachedThreshold={0.25}
				onRefresh={async () => {
					await refetch();
				}}
				refreshing={isRefetching}
				ListEmptyComponent={NoBookmarks}
				ItemSeparatorComponent={ArticleFeedSeparator}
				ListFooterComponent={ArticleFeedSeparator}
			/>
		</View>
	);
};

SavedArticlesFeed.displayName = "SavedArticlesFeed";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%"
	},
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
	list: {}
});
