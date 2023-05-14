import { Text } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";

import { supabase } from "@/api/supabase";
import { useAuth } from "@/context/auth";

import { ArticleFeedSeparator } from "./article-feed";
import { ArticlePreview } from "./article-preview";

const NoBookmarks = () => <Text>No bookmarks :(</Text>;

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

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: "100%"
		},
		list: {}
	});

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
