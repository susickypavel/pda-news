import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export const ArticlePreview: React.FC = () => {
	return (
		<View
			style={{
				width: "100%",
				height: 320
			}}
		>
			<Text>Hello, World!</Text>
		</View>
	);
};

ArticlePreview.displayName = "ArticlePreview";
