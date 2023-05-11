import { Badge, Image } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

export const ArticleCard: React.FC<ArticlePreviewProps> = props => {
	const {
		title,
		content,
		source_id: { name },
		category
	} = props;

	return (
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
				<Image containerStyle={styles.image} source={{ uri: "https://dummyimage.com/480/000/fff" }} />
			</View>
			<Text style={styles.content} numberOfLines={4}>
				{content}
			</Text>
		</View>
	);
};

ArticleCard.displayName = "ArticlePreview";

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
		flex: 1,
		flexDirection: "row",
		marginBottom: 10
	},
	content: {
		fontSize: 12,
		marginBottom: 30
	},
	domain: {
		fontSize: 16
	},
	image: {
		height: 116,
		marginLeft: 10,
		marginTop: 16,
		width: 116
	},
	title: {
		fontSize: 24,
		fontWeight: "500",
		lineHeight: 28
	}
});
