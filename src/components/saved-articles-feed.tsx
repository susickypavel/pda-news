import { Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import { BookmarkSortOrder, useBookmarkedArticles } from "@/queries/articles";

import { FetchingIndicator } from "./article-feed";
import { IllustrationTemplate } from "./common/illustration";
import { SearchFeedItem, SearchFeedSeparator } from "./search-feed";

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
				bounces={false}
				keyExtractor={item => item.id}
				renderItem={({ item }: any) => <SearchFeedItem {...item} action="unbookmark" />}
				estimatedItemSize={10}
				ListEmptyComponent={isLoading ? FetchingIndicator : NoBookmarks}
				ItemSeparatorComponent={SearchFeedSeparator}
			/>
		</View>
	);
};

SavedArticlesFeed.displayName = "SavedArticlesFeed";
