import { Badge, Icon, Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

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

const CategoryFeedItem: React.FC<CategoryFeedItemProps> = ({ is_bookmarked, content, title, image_url, source_id, category }) => {
	const { theme } = useTheme();

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

	return (
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
				<Icon name={is_bookmarked ? "bookmark" : "bookmark-border"} color="black" size={32} />
			</View>
		</View>
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
