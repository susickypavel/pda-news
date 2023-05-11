import { useNavigation } from "@react-navigation/native";
import { Badge, Image } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
					<Image containerStyle={styles.image} source={{ uri: "https://dummyimage.com/480/000/fff" }} />
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
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20
	},
	content: {
		fontSize: 12,
		lineHeight: 18,
		marginBottom: 30
	},
	domain: {
		fontSize: 16
	},
	image: {
		height: 120,
		marginLeft: 10,
		marginTop: 16,
		width: 120
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		lineHeight: 28
	}
});
