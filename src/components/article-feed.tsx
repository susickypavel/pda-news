import { Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { ArticlePreview } from "@/components/article-preview";
import { useArticleFeed } from "@/queries/articles";

import { IllustrationTemplate } from "./common/illustration";

export const ArticleFeedSeparator: React.FC = () => <View style={styles.separator} />;

export const FetchingIndicator: React.FC = () => {
	const { theme } = useTheme();

	return (
		<ActivityIndicator
			size="large"
			color={theme.colors.brand}
			style={{
				marginVertical: 32
			}}
		/>
	);
};

export const EmptyList: React.FC = () => (
	<IllustrationTemplate title="We are sorry!" image={require("@/assets/images/illustrations/no-news-today.png")}>
		<Text>There are no news for this day, yet.</Text>
		<Text>Choose another date to dive into hot topics!</Text>
	</IllustrationTemplate>
);

export const ListEnd: React.FC = () => (
	<IllustrationTemplate title="Great job!" image={require("@/assets/images/illustrations/end-of-list.png")}>
		<Text>You have finished all the news for this day.</Text>
		<Text>Come back tommorow for more stories!</Text>
	</IllustrationTemplate>
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
		return <FetchingIndicator />;
	}

	if (isError) {
		return <Text>Error</Text>;
	}

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			data={articles}
			keyExtractor={item => item.id}
			renderItem={({ item }: any) => <ArticlePreview {...item} />}
			ListEmptyComponent={EmptyList}
			ItemSeparatorComponent={ArticleFeedSeparator}
			estimatedItemSize={200}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
			ListFooterComponent={
				isFetchingNextPage ? FetchingIndicator : !hasNextPage && articles.length > 0 ? ListEnd : null
			}
		/>
	);
};

const styles = StyleSheet.create({
	separator: {
		height: 32
	}
});

ArticleFeed.displayName = "ArticleFeed";
