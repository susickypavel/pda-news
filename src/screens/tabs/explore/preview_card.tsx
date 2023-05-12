import { useNavigation } from "@react-navigation/native";
import { Badge, Image, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

export const PreviewCard: React.FC<ArticlePreviewProps> = props => {
	const { title, category } = props;
	const { navigate } = useNavigation();
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		author: {
			alignItems: "center",
			flexDirection: "row",
			gap: 8,
			marginVertical: 8
		},
		container: {
			flex: 1,
			height: 260,
			marginRight: 8,
			marginVertical: 12,
			width: 160
		},
		descriptionContainer: {
			marginLeft: 6
		},
		thumbnailImg: {
			borderRadius: 4,
			height: 160,
			width: 160
		},
		title: {
			color: theme.colors.black,
			fontSize: 16,
			fontWeight: "500",
			lineHeight: 18
		}
	});

	return (
		<TouchableWithoutFeedback
			onPress={() =>
				navigate("ArticleDetail", {
					original_url: props.original_url
				})
			}
		>
			<View style={styles.container}>
				<Image containerStyle={styles.thumbnailImg} source={{ uri: "https://dummyimage.com/640/000/fff" }} />
				<View style={styles.descriptionContainer}>
					<View style={styles.author}>
						<Badge value={category} category={category} />
					</View>
					<Text numberOfLines={3} style={styles.title}>
						{title}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

PreviewCard.displayName = "ArticlePreview";
