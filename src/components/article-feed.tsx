import { Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React, { memo } from "react";
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
	region: string;
	headerComponent?: JSX.Element;
};

const Feed: React.FC<ArticleFeedProps> = ({ currentDate, region, headerComponent }) => {
	const [articles, { hasNextPage, isFetchingNextPage, fetchNextPage, isError, isLoading, refetch, isRefetching }] =
		useArticleFeed(currentDate, region);

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
			ListHeaderComponent={headerComponent}
			showsVerticalScrollIndicator={false}
			refreshing={isRefetching}
			onRefresh={refetch}
			data={articles}
			keyExtractor={item => item.id}
			renderItem={({ item }: any) => <ArticlePreview {...item} />}
			ListEmptyComponent={EmptyList}
			ItemSeparatorComponent={ArticleFeedSeparator}
			estimatedItemSize={200}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
			ListFooterComponentStyle={{
				marginVertical: 32
			}}
			ListFooterComponent={
				isFetchingNextPage ? FetchingIndicator : !hasNextPage && articles.length > 0 ? ListEnd : null
			}
		/>
	);
};

export const ArticleFeed = memo(Feed);

const styles = StyleSheet.create({
	separator: {
		height: 32
	}
});

ArticleFeed.displayName = "ArticleFeed";
