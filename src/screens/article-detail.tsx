import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Icon, useTheme } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { Share, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";

import { supabase } from "@/api/supabase";
import { useAuthSafe } from "@/context/auth";
import { useBookmarkStore } from "@/stores/bookmark-store";
import type { RootStackParamList } from "@/types/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export const ArticleDetailHeaderActions: React.FC<ArticleDetailsScreenProps> = ({ route }) => {
	const { user } = useAuthSafe();
	const { theme } = useTheme();
	const queryClient = useQueryClient();
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

		queryClient.invalidateQueries({
			queryKey: ["saved-articles", user.id]
		});
	};

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			gap: theme.spacing.md
		}
	});

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onBookmark}>
				<Icon name={isBookmarked ? "bookmark" : "bookmark-border"} color="black" size={28} />
			</TouchableOpacity>
			<TouchableOpacity onPress={onShare}>
				<Icon name="ios-share" color="black" size={28} />
			</TouchableOpacity>
		</View>
	);
};

export const ArticleDetailScreen: React.FC<ArticleDetailsScreenProps> = ({ route, navigation }) => {
	const { original_url, category } = route.params;
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		webview: {
			flex: 1
		}
	});

	useEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: theme.colors.categories[category].bg
			},
			headerRight: () => <ArticleDetailHeaderActions route={route} navigation={navigation} />
		});
	}, [navigation, theme, category]);

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
