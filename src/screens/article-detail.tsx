import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { Share, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

import { supabase } from "@/api/supabase";
import { useAuth } from "@/context/auth";
import type { RootStackParamList } from "@/types/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export const ArticleDetailHeaderActions: React.FC<ArticleDetailsScreenProps> = ({ route }) => {
	const { user } = useAuth();

	const onShare = () => {
		Share.share({
			title: route.params.title,
			url: route.params.original_url
		});
	};

	const onBookmark = async () => {
		const response = await supabase.from("user_articles").insert({
			user_id: user.id,
			article_id: route.params.id
		});

		console.log(response);
	};

	return (
		<View style={{ flexDirection: "row" }}>
			<Button type="clear" containerStyle={styles.headerButton} onPress={onBookmark}>
				<Icon name="bookmark-border" color="black" size={32} />
			</Button>
			<Button type="clear" containerStyle={styles.headerButton} onPress={onShare}>
				<Icon name="ios-share" color="black" size={32} />
			</Button>
		</View>
	);
};

export const ArticleDetailScreen: React.FC<ArticleDetailsScreenProps> = ({ route }) => {
	const { original_url } = route.params;

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
