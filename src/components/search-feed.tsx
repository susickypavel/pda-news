import { useNavigation } from "@react-navigation/native";
import { Button, ListItem, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Image, StyleSheet } from "react-native";

import { supabase } from "@/api/supabase";
import { useAuthSafe } from "@/context/auth";
import { useSearchArticles } from "@/queries/articles";
import { useBookmarkStore } from "@/stores/bookmark-store";

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
	const { title, published_at, image_url, category, id } = props;
	const { user } = useAuthSafe();
	const { theme } = useTheme();
	const { navigate } = useNavigation();
	const queryClient = useQueryClient();
	const toggleBookmark = useBookmarkStore(state => state.toggleBookmark);

	const styles = StyleSheet.create({
		bookmarkButton: {
			minHeight: "100%"
		},
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
		},
		title: {
			fontFamily: "InterTightBold"
		}
	});

	const onPress = () => {
		onRedirect();
		navigate("ArticleDetail", { ...props, is_bookmarked: false } as any);
	};

	const onBookmarkButtonPress = async () => {
		toggleBookmark(id, true);

		const { error } = await supabase.from("user_articles").insert({
			user_id: user.id,
			article_id: id
		});

		if (error) {
			console.error("Error creating bookmark", error.message);
		}

		queryClient.invalidateQueries({
			queryKey: ["saved-articles", user.id]
		});
	};

	return (
		<ListItem.Swipeable
			rightContent={reset => (
				<Button
					buttonStyle={styles.bookmarkButton}
					title="Bookmark"
					onPress={() => {
						onBookmarkButtonPress();
						reset();
					}}
					icon={{ name: "bookmark", color: "white" }}
				/>
			)}
			style={styles.container}
			onPress={onPress}
		>
			<Image
				style={styles.thumbnailImage}
				source={image_url ? { uri: image_url } : require("@/assets/images/fallback-thumbnail.png")}
			/>

			<ListItem.Content style={styles.content}>
				<ListItem.Title style={styles.title} numberOfLines={2}>
					{title}
				</ListItem.Title>
				<ListItem.Subtitle>{new Date(published_at).toLocaleDateString()}</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem.Swipeable>
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
