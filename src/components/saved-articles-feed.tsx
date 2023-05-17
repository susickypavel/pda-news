import { Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import { BookmarkSortOrder, useBookmarkedArticles } from "@/queries/articles";

import { ArticleFeedSeparator, FetchingIndicator } from "./article-feed";
import { ArticlePreview } from "./article-preview";
import { IllustrationTemplate } from "./common/illustration";

const NoBookmarks = () => (
	<IllustrationTemplate
		title="You don't have any articles saved."
		image={require("@/assets/images/illustrations/no-bookmarks.png")}
	>
		<Text>Go back exploring and save some articles so you can get back to them whenever you want!</Text>
	</IllustrationTemplate>
);

interface SavedArticlesFeedProps {
	searchTerm: string;
	order: BookmarkSortOrder;
}

export const SavedArticlesFeed: React.FC<SavedArticlesFeedProps> = ({ searchTerm, order }) => {
	const query = useBookmarkedArticles(searchTerm, order);
	const { data, isLoading } = query;
	const { theme } = useTheme();

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
				renderItem={({ item }: any) => <ArticlePreview {...item} is_bookmarked={true} />}
				estimatedItemSize={10}
				ListEmptyComponent={isLoading ? FetchingIndicator : NoBookmarks}
				ItemSeparatorComponent={ArticleFeedSeparator}
			/>
		</View>
	);
};

SavedArticlesFeed.displayName = "SavedArticlesFeed";
