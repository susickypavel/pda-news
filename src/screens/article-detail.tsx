import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import type { RootStackParamList } from "@/types/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export const ArticleDetailScreen: React.FC<ArticleDetailsScreenProps> = ({ route, navigation }) => {
	const { original_url } = route.params;

	useFocusEffect(() => {
		navigation.setOptions({
			headerTitle: route.params.source_id.domain
		});
	});

	return (
		<WebView
			style={styles.webview}
			source={{
				uri: original_url
			}}
		/>
	);
};

const styles = StyleSheet.create({
	webview: {
		flex: 1
	}
});
