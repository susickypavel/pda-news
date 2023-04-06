import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

import type { RootStackParamList } from "@/types/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export const ArticleDetailHeaderActions: React.FC = () => {
	return (
		<View style={{ flexDirection: "row" }}>
			<Button type="clear" containerStyle={styles.headerButton}>
				<Icon name="bookmark-border" color="black" size={32} />
			</Button>
			<Button type="clear" containerStyle={styles.headerButton}>
				<Icon name="ios-share" color="black" size={32} />
			</Button>
		</View>
	);
};

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
	headerButton: {
		width: "auto"
	},
	webview: {
		flex: 1
	}
});
