import { useNavigation } from "@react-navigation/native";
import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

interface ArticlePreviewProps {
	title: string;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ title }) => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	return (
		<TouchableWithoutFeedback onPress={() => navigate("ArticleDetail")}>
			<View
				style={{
					width: "100%",
					height: 320,
					backgroundColor: theme.colors.grey1
				}}
			>
				<Text>{title}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

ArticlePreview.displayName = "ArticlePreview";
