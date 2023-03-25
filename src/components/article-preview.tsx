import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export const ArticlePreview: React.FC = () => {
	const { theme } = useTheme();

	return (
		<View
			style={{
				width: "100%",
				height: 320,
				backgroundColor: theme.colors.grey1
			}}
		>
			<Text>Hello, World!</Text>
		</View>
	);
};

ArticlePreview.displayName = "ArticlePreview";
