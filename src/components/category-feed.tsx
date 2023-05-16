import { useNavigation } from "@react-navigation/native";
import { Badge, Icon, Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBookmarkStore } from "src/stores/bookmark-store";

import { useCategoryFeed } from "@/queries/articles";
import { BadgeCategory } from "@/types/theme";

type CategoryFeedProps = {
	category: BadgeCategory;
};

type CategoryFeedItemProps = ReturnType<typeof useCategoryFeed>[0][0] & {
	source_id: {
		name: string;
	};
};

const CategoryFeedSeparator = () => (
	<View
		style={{
			height: 1,
			backgroundColor: "#969696",
			marginVertical: 16
		}}
	/>
);

const CategoryFeedItem: React.FC<CategoryFeedItemProps> = props => {
	const { is_bookmarked, content, title, id, image_url, source_id, category } = props;
	const { theme } = useTheme();
	const { navigate } = useNavigation();
	const bookmarks = useBookmarkStore(state => state.bookmarks);

	const isBookmarked = typeof bookmarks[id] === "undefined" ? is_bookmarked : bookmarks[id];

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			gap: theme.spacing.md,
			marginVertical: theme.spacing.lg,
			paddingHorizontal: theme.spacing.lg
		},
		description: {
			borderLeftColor: theme.colors.black,
			borderLeftWidth: 2,
			paddingLeft: theme.spacing.md
		},
		footer: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "space-between"
		},
		header: {
			alignItems: "center",
			flexDirection: "row",
			flex: 1,
			gap: theme.spacing.xl
		},
		heading: {
			fontSize: 20,
			fontWeight: "700"
		},
		leftPanel: {
			flex: 1,
			gap: theme.spacing.sm
		},
		thumbnail: {
			// @ts-ignore
			backgroundColor: theme.colors.categories[category].bg,
			borderRadius: 4,
			height: 120,
			width: 120
		}
	});

	const onPress = () => navigate("ArticleDetail", props);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.leftPanel}>
						<Text>{source_id.name}</Text>
						<Text style={styles.heading} numberOfLines={3}>
							{title}
						</Text>
					</View>
					<Image
						style={styles.thumbnail}
						resizeMethod="scale"
						resizeMode="cover"
						source={image_url ? { uri: image_url } : require("@/assets/images/fallback-thumbnail.png")}
					/>
				</View>
				{content ? (
					<Text style={styles.description} numberOfLines={3}>
						{content}
					</Text>
				) : null}
				<View style={styles.footer}>
					<Badge value={category} category={category as BadgeCategory} />
					<Icon name={isBookmarked ? "bookmark" : "bookmark-border"} color="black" size={32} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export const CategoryFeed: React.FC<CategoryFeedProps> = ({ category }) => {
	const [data, { isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }] = useCategoryFeed(category);

	if (isLoading) return null;

	const onEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			data={data}
			keyExtractor={item => item.id}
			renderItem={({ item }: any) => <CategoryFeedItem {...item} />}
			estimatedItemSize={200}
			onEndReached={onEndReached}
			ItemSeparatorComponent={CategoryFeedSeparator}
			onEndReachedThreshold={0.25}
		/>
	);
};

CategoryFeed.displayName = "CategoryFeed";
