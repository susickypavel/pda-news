import { useNavigation } from "@react-navigation/native";
import { Badge, Text, useTheme } from "@rneui/themed";
import React from "react";
import { Image, Share, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { useArticleFeed } from "@/api/queries/articles";
import { BadgeCategory } from "@/types/theme";

export type ArticlePreviewProps = ReturnType<typeof useArticleFeed>[0][0] & {
	category: BadgeCategory;
	source_id: {
		name: string;
	};
};

export const ArticlePreview: React.FC<ArticlePreviewProps> = props => {
	const { navigate } = useNavigation();
	const { theme } = useTheme();

	const {
		title,
		content,
		source_id: { name },
		category,
		original_url
	} = props;

	const onPress = () => {
		navigate("ArticleDetail", props);
	};

	const onLongPress = () => {
		Share.share({
			title,
			url: original_url
		});
	};

	const isExternal = !content;

	const styles = StyleSheet.create({
		author: {
			alignItems: "center",
			flexDirection: "row",
			gap: 8
		},
		container: {
			gap: 12,
			width: "100%"
		},
		domain: {
			fontSize: 16,
			marginRight: "auto"
		},
		excerpt: {
			fontSize: 14
		},
		excerptContainer: {
			borderColor: theme.colors.brand,
			borderLeftWidth: 3,
			paddingHorizontal: 16
		},
		thumbnail: {
			aspectRatio: 16 / 9,
			backgroundColor: theme.colors.categories[props.category].bg,
			flex: 1,
			height: undefined,
			width: "100%"
		},
		title: {
			fontFamily: "BitterSemiBold",
			fontSize: 26,
			lineHeight: 26 * 1.25
		}
	});

	return (
		<TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
			<View style={styles.container}>
				<Image
					style={styles.thumbnail}
					resizeMethod="scale"
					resizeMode="cover"
					source={
						props.image_url ? { uri: props.image_url } : require("@/assets/images/fallback-thumbnail.png")
					}
				/>
				<Text style={styles.title}>{title}</Text>
				{isExternal ? null : (
					<View style={styles.excerptContainer}>
						<Text style={styles.excerpt} numberOfLines={2}>
							{content}
						</Text>
					</View>
				)}
				<View style={styles.author}>
					<Badge value={category} category={category} />
					<Text style={styles.domain}>{name}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

ArticlePreview.displayName = "ArticlePreview";
