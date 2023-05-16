import { Text } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import { ArticlePreview } from "@/components/article-preview";
import { useArticleFeed } from "@/queries/articles";

export const ArticleFeedSeparator: React.FC = () => <View style={styles.separator} />;

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
	const [articles, { hasNextPage, isFetchingNextPage, fetchNextPage, isError, isLoading }] =
		useArticleFeed(currentDate);

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
	list: {
		padding: 8
	},
	separator: {
		height: 32
	}
});

ArticleFeed.displayName = "ArticleFeed";
