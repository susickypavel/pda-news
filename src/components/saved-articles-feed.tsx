import { Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import { useBookmarkedArticles } from "@/api/queries/articles";

import { ArticleFeedSeparator } from "./article-feed";
import { ArticlePreview } from "./article-preview";

const NoBookmarks = () => <Text>No bookmarks :(</Text>;

export const SavedArticlesFeed: React.FC = () => {
	const { data, isLoading, isError, refetch, isRefetching } = useBookmarkedArticles();
	const { theme } = useTheme();

	if (isError) return null;

	if (isLoading) return null;

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: theme.spacing.sm
		}
	});

	return (
		<View style={styles.container}>
			<FlashList
				showsVerticalScrollIndicator={false}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <ArticlePreview {...item} is_bookmarked={true} />}
				estimatedItemSize={10}
				onEndReachedThreshold={0.25}
				onRefresh={async () => {
					await refetch();
				}}
				refreshing={isRefetching}
				ListEmptyComponent={NoBookmarks}
				ItemSeparatorComponent={ArticleFeedSeparator}
			/>
		</View>
	);
};

SavedArticlesFeed.displayName = "SavedArticlesFeed";
