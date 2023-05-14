import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Icon, useTheme } from "@rneui/themed";
import React, { useMemo } from "react";
import { Share, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

import { supabase } from "@/api/supabase";
import { useAuth } from "@/context/auth";
import { useBookmarkStore } from "@/stores/bookmark-store";
import type { RootStackParamList } from "@/types/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export const ArticleDetailHeaderActions: React.FC<ArticleDetailsScreenProps> = ({ route }) => {
	const { user } = useAuth();
	const { theme } = useTheme();
	const { id, title, original_url, is_bookmarked } = route.params;
	const [bookmarks, toggleBookmark] = useBookmarkStore(state => [state.bookmarks, state.toggleBookmark]);

	const isBookmarked = useMemo(
		() => (typeof bookmarks[id] === "undefined" ? is_bookmarked : bookmarks[id]),
		[bookmarks, id, is_bookmarked]
	);

	const onShare = () => {
		Share.share({
			title: title,
			url: original_url
		});
	};

	const onBookmark = async () => {
		toggleBookmark(id, !isBookmarked);

		if (isBookmarked) {
			const { error } = await supabase.from("user_articles").delete().eq("user_id", user.id).eq("article_id", id);

			if (error) {
				console.error("Error deleting bookmark", error.message);
			}
		} else {
			const { error } = await supabase.from("user_articles").insert({
				user_id: user.id,
				article_id: id
			});

			if (error) {
				console.error("Error creating bookmark", error.message);
			}
		}
	};

	return (
		<View style={{ flexDirection: "row" }}>
			<Button type="clear" containerStyle={styles.headerButton} onPress={onBookmark}>
				<Icon
					name={isBookmarked ? "bookmark" : "bookmark-border"}
					color={isBookmarked ? theme.colors.brand : "black"}
					size={32}
				/>
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
			originWhitelist={["*"]}
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
