import { useNavigation } from "@react-navigation/native";
import { Badge, useTheme } from "@rneui/themed";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { ArticlePreviewProps } from "@/components/article-preview";

export const ArticleCard: React.FC<ArticlePreviewProps> = props => {
	const {
		title,
		content,
		source_id: { name },
		category
	} = props;

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
			borderBottomColor: "#CCCCCC",
			borderBottomWidth: 1,
			flex: 1,
			marginVertical: 10
		},
		containerLeftCol: {
			flex: 1,
			flexDirection: "column"
		},
		containerTopPart: {
			alignItems: "flex-end",
			flex: 1,
			flexDirection: "row",
			justifyContent: "flex-end",
			marginBottom: 20
		},
		content: {
			color: theme.colors.black,
			fontSize: 12,
			lineHeight: 18,
			marginBottom: 30
		},
		domain: {
			color: theme.colors.black,
			fontSize: 16
		},
		image: {
			// @ts-ignore
			backgroundColor: theme.colors.categories[category].bg,
			height: 120,
			marginLeft: 10,
			marginTop: 16,
			width: 120
		},
		title: {
			color: theme.colors.black,
			fontSize: 24,
			fontWeight: "bold",
			lineHeight: 28
		}
	});

	return (
		<TouchableWithoutFeedback onPress={() => navigate("ArticleDetail", props)}>
			<View style={styles.container}>
				<View style={styles.containerTopPart}>
					<View style={styles.containerLeftCol}>
						<View style={styles.author}>
							<Badge value={category} category={category} />
							<Text style={styles.domain}>{name}</Text>
						</View>
						<Text numberOfLines={3} style={styles.title}>
							{title}
						</Text>
					</View>
					<Image
						style={styles.image}
						resizeMethod="scale"
						resizeMode="cover"
						source={
							props.image_url
								? { uri: props.image_url }
								: require("@/assets/images/fallback-thumbnail.png")
						}
					/>
				</View>
				{content ? (
					<Text style={styles.content} numberOfLines={4}>
						{content}
					</Text>
				) : null}
			</View>
		</TouchableWithoutFeedback>
	);
};

ArticleCard.displayName = "ArticlePreview";
