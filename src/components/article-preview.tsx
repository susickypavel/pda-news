import { useNavigation } from "@react-navigation/native";
import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import type { ArticleData } from "@/stores/explore-feed";

type ArticlePreviewProps = ArticleData;

export const ArticlePreview: React.FC<ArticlePreviewProps> = props => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	const { title } = props;

	return (
		<TouchableWithoutFeedback onPress={() => navigate("ArticleDetail", props)}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: theme.colors.grey1
					}
				]}
			>
				<Text>{title}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 320,
		width: "100%"
	}
});

ArticlePreview.displayName = "ArticlePreview";
