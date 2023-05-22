import { useNavigation } from "@react-navigation/native";
import { Badge, useTheme } from "@rneui/themed";
import React from "react";
import { Image, Share, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

export const PreviewCard: React.FC<ArticlePreviewProps> = props => {
	const { title, category, original_url } = props;
	const { navigate } = useNavigation();
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		badge: {
			flexDirection: "row"
		},
		container: {
			gap: theme.spacing.sm,
			width: 160
		},
		thumbnailImg: {
			// @ts-ignore
			backgroundColor: theme.colors.categories[category].bg,
			borderRadius: 4,
			height: 160,
			width: 160
		},
		title: {
			color: theme.colors.black,
			fontFamily: "InterTightMedium",
			fontSize: 16,
			lineHeight: 20
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
		<TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
			<View style={styles.container}>
				<Image
					style={styles.thumbnailImg}
					source={
						props.image_url ? { uri: props.image_url } : require("@/assets/images/fallback-thumbnail.png")
					}
				/>
				<Badge value={category} category={category} containerStyle={styles.badge} />
				<Text numberOfLines={3} style={styles.title}>
					{title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

PreviewCard.displayName = "PreviewCard";
