import { useNavigation } from "@react-navigation/native";
import { Button, ListItem, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Image, Platform, StyleSheet, TouchableHighlight, TouchableNativeFeedback, View } from "react-native";
import { Text } from "react-native";

import { supabase } from "@/api/supabase";
import { useAuthSafe } from "@/context/auth";
import { useSearchArticles } from "@/queries/articles";
import { BadgeCategory } from "@/types/theme";

import { FetchingIndicator } from "./article-feed";
import { IllustrationTemplate } from "./common/illustration";

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
	onRedirect?: () => void;
	is_bookmarked?: boolean;
};

const EmptySearchList: React.FC = () => (
	<IllustrationTemplate title="We are sorry!" image={require("@/assets/images/illustrations/search-not-found.png")}>
		<Text>We couldn{"'"}t find article you were looking for.</Text>
		<Text>Check typos and try using full words.</Text>
	</IllustrationTemplate>
);

export const SearchFeedSeparator = () => <View style={{ height: 8 }} />;

export const SearchFeedItem: React.FC<SearchFeedItemProps> = ({ onRedirect, ...props }) => {
	const { title, published_at, image_url, category, id, source_id } = props;
	const { user } = useAuthSafe();
	const { theme } = useTheme();
	const { navigate } = useNavigation();
	const queryClient = useQueryClient();

	const styles = StyleSheet.create({
		bookmarkButton: {
			minHeight: "100%"
		},
		container: {
			justifyContent: "flex-start",
			padding: 0
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
		if (onRedirect) {
			onRedirect();
		}

		navigate("ArticleDetail", props);
	};

	const onBookmarkButtonPress = async () => {
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
				contentContainerStyle={{ padding: 8 }}
				keyboardShouldPersistTaps="handled"
				bounces={false}
				showsVerticalScrollIndicator={false}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }: any) => <SearchFeedItem {...item} onRedirect={onRedirect} />}
				ListEmptyComponent={isFetched ? EmptySearchList : null}
				estimatedItemSize={10}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isFetchingNextPage ? FetchingIndicator : null}
				ItemSeparatorComponent={SearchFeedSeparator}
			/>
		</Fragment>
	);
};

SearchFeed.displayName = "SearchFeed";
