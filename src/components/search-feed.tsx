import { useNavigation } from "@react-navigation/native";
import { ListItem, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React, { Fragment } from "react";
import { Image, StyleSheet } from "react-native";

import { useSearchArticles } from "@/queries/articles";

import { EmptyList, FetchingIndicator } from "./article-feed";

type SearchResult = ReturnType<typeof useSearchArticles>;

type SearchFeedProps = {
	searchTerm: string;
	children: (query: SearchResult[1]) => JSX.Element;
	onRedirect: () => void;
};

type SearchFeedItemProps = SearchResult[0][0] & {
	onRedirect: () => void;
};

const SearchFeedItem: React.FC<SearchFeedItemProps> = ({ onRedirect, ...props }) => {
	const { title, published_at, image_url, category } = props;
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	const styles = StyleSheet.create({
		container: {
			justifyContent: "flex-start"
		},
		content: {
			gap: theme.spacing.sm
		},
		thumbnailImage: {
			// @ts-ignore
			backgroundColor: theme.colors.categories[category].bg,
			height: 80,
			width: 80
		}
	});

	const onPress = () => {
		onRedirect();
		navigate("ArticleDetail", { ...props, is_bookmarked: false } as any);
	};

	return (
		<ListItem style={styles.container} onPress={onPress}>
			<Image
				style={styles.thumbnailImage}
				source={image_url ? { uri: image_url } : require("@/assets/images/fallback-thumbnail.png")}
			/>
			<ListItem.Content style={styles.content}>
				<ListItem.Title numberOfLines={3}>{title}</ListItem.Title>
				<ListItem.Subtitle>{new Date(published_at).toLocaleDateString()}</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export const SearchFeed: React.FC<SearchFeedProps> = ({ searchTerm, children, onRedirect }) => {
	const [data, query] = useSearchArticles(searchTerm);
	const { isFetchingNextPage, isFetched, fetchNextPage, hasNextPage } = query;

	const onEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	return (
		<Fragment>
			{children(query)}
			<FlashList
				bounces={false}
				showsVerticalScrollIndicator={false}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <SearchFeedItem {...item} onRedirect={onRedirect} />}
				ListEmptyComponent={isFetched ? EmptyList : null}
				estimatedItemSize={10}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isFetchingNextPage ? FetchingIndicator : null}
			/>
		</Fragment>
	);
};

SearchFeed.displayName = "SearchFeed";
