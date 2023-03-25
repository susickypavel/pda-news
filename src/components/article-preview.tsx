import { useNavigation } from "@react-navigation/native";
import { Button, Text, useTheme } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export const ArticlePreview: React.FC = () => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	return (
		<View
			style={{
				width: "100%",
				height: 320,
				backgroundColor: theme.colors.grey1
			}}
		>
			<Text>Hello, World!</Text>
			<Button title="Read" onPress={() => navigate("ArticleDetail")} />
		</View>
	);
};

ArticlePreview.displayName = "ArticlePreview";
