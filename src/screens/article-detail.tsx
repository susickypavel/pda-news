import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import type { RootStackParamList } from "src/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export const ArticleDetailScreen: React.FC<ArticleDetailsScreenProps> = () => {
	return (
		<View>
			<Text>ArticleDetail</Text>
		</View>
	);
};
