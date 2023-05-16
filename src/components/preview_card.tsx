import { useNavigation } from "@react-navigation/native";
import { Badge, useTheme } from "@rneui/themed";
import React from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

export const PreviewCard: React.FC<ArticlePreviewProps> = props => {
	const { title, category } = props;
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
			fontSize: 16,
			fontWeight: "500",
			lineHeight: 20
		}
	});

	const onPress = () => navigate("ArticleDetail", props);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Image
					style={styles.thumbnailImg}
					source={props.image_url ? { uri: props.image_url } : require("@/assets/images/fallback-thumbnail.png")}
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
