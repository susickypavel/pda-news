import { useNavigation } from "@react-navigation/native";
import { Text, useTheme } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, Share, StyleSheet, TouchableNativeFeedback, View } from "react-native";

import { useCategoryFeed } from "@/queries/articles";
import { BadgeCategory } from "@/types/theme";

import { EmptyList, FetchingIndicator, ListEnd } from "./article-feed";

type CategoryFeedProps = {
	category: BadgeCategory;
};

type CategoryFeedItemProps = ReturnType<typeof useCategoryFeed>[0][0] & {
	source_id: {
		name: string;
	};
	category: BadgeCategory;
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
	const { content, title, image_url, source_id, category, published_at, original_url } = props;
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			gap: theme.spacing.md,
			paddingHorizontal: theme.spacing.lg
		},
		date: {
			fontFamily: "InterTightMedium",
			fontSize: 12
		},
		description: {
			fontSize: 14,
			lineHeight: 21,
			marginTop: theme.spacing.sm
		},
		header: {
			alignItems: "center",
			flexDirection: "row",
			flex: 1,
			gap: theme.spacing.xl
		},
		heading: {
			fontFamily: "InterTightBold",
			fontSize: 20
		},
		leftPanel: {
			flex: 1,
			gap: theme.spacing.sm
		},
		thumbnail: {
			backgroundColor: theme.colors.categories[category].bg,
			borderRadius: 4,
			height: 120,
			width: 120
		}
	});

	const onPress = () => navigate("ArticleDetail", props);

	const onLongPress = () => {
		Share.share({
			title,
			url: original_url
		});
	};

	return (
		<TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.leftPanel}>
						<Text style={styles.date}>{new Date(published_at).toLocaleDateString()}</Text>
						<Text style={styles.heading} numberOfLines={3}>
							{title}
						</Text>
						<Text>{source_id.name}</Text>
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
			</View>
		</TouchableNativeFeedback>
	);
};

export const CategoryFeed: React.FC<CategoryFeedProps> = ({ category }) => {
	const [data, { isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }] = useCategoryFeed(category);

	if (isLoading) {
		return <FetchingIndicator />;
	}

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
			contentContainerStyle={{
				paddingVertical: 16
			}}
			renderItem={({ item }: any) => <CategoryFeedItem {...item} />}
			estimatedItemSize={200}
			onEndReached={onEndReached}
			ItemSeparatorComponent={CategoryFeedSeparator}
			onEndReachedThreshold={0.5}
			ListFooterComponentStyle={{
				marginVertical: 32
			}}
			ListEmptyComponent={EmptyList}
			ListFooterComponent={
				isFetchingNextPage ? FetchingIndicator : !hasNextPage && data.length > 0 ? ListEnd : null
			}
		/>
	);
};

CategoryFeed.displayName = "CategoryFeed";
