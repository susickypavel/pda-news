import { useNavigation } from "@react-navigation/native";
import { Badge, Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import type { ArticleData } from "@/stores/daily-feed";

type ArticlePreviewProps = ArticleData;

export const ArticlePreview: React.FC<ArticlePreviewProps> = props => {
	const { navigate } = useNavigation();

	const {
		title,
		content,
		source_id: { domain },
		category
	} = props;

	return (
		<TouchableWithoutFeedback onPress={() => navigate("ArticleDetail", props)}>
			<View style={styles.container}>
				<Image
					containerStyle={styles.thumbnail}
					source={{
						uri: "https://dummyimage.com/600x400/f59f00/000000"
					}}
				/>
				<View style={styles.author}>
					<Badge value={category} />
					<Text style={styles.domain}>{domain}</Text>
				</View>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.excerptContainer}>
					<Text style={styles.excerpt} numberOfLines={2}>
						{content}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

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
		fontSize: 16
	},
	excerpt: {
		fontSize: 14
	},
	excerptContainer: {
		borderLeftColor: "#f00",
		borderLeftWidth: 1,
		paddingHorizontal: 16
	},
	thumbnail: {
		aspectRatio: 1,
		flex: 1,
		width: "100%"
	},
	title: {
		fontFamily: "BitterSemiBold",
		fontSize: 26,
		lineHeight: 26 * 1.25
	}
});

ArticlePreview.displayName = "ArticlePreview";
