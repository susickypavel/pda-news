import { useNavigation } from "@react-navigation/native";
import { Button, ListItem, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Image, Platform, StyleSheet, TouchableHighlight, TouchableNativeFeedback } from "react-native";

import { supabase } from "@/api/supabase";
import { useAuthSafe } from "@/context/auth";
import { useSearchArticles } from "@/queries/articles";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { BadgeCategory } from "@/types/theme";

import { EmptyList, FetchingIndicator } from "./article-feed";

type SearchResult = ReturnType<typeof useSearchArticles>;

type SearchFeedProps = {
	searchTerm: string;
	children: (query: SearchResult[1]) => JSX.Element;
	onRedirect: () => void;
};

type SearchFeedItemProps = SearchResult[0][0] & {
	source_id: {
		name: string;
	};
	category: BadgeCategory;
	onRedirect: () => void;
};

const SearchFeedItem: React.FC<SearchFeedItemProps> = ({ onRedirect, ...props }) => {
	const { title, published_at, image_url, category, id, source_id } = props;
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
			justifyContent: "flex-start",
			padding: theme.spacing.sm
		},
		content: {
			gap: theme.spacing.xs
		},
		thumbnailImage: {
			backgroundColor: theme.colors.categories[category].bg,
			height: 100,
			width: 100
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
			Component={Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight}
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
			containerStyle={styles.container}
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
				<ListItem.Subtitle>{source_id.name}</ListItem.Subtitle>
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
				keyboardShouldPersistTaps="handled"
				bounces={false}
				showsVerticalScrollIndicator={false}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }: any) => <SearchFeedItem {...item} onRedirect={onRedirect} />}
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
