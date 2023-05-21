import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, useTheme } from "@rneui/themed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Alert, Share, StatusBar, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";

import { supabase } from "@/api/supabase";
import { useAuthSafe } from "@/context/auth";
import type { RootStackParamList } from "@/types/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

export const ArticleDetailHeaderActions: React.FC<ArticleDetailsScreenProps> = ({ route }) => {
	const { user } = useAuthSafe();
	const { theme } = useTheme();
	const queryClient = useQueryClient();
	const { id, title, original_url } = route.params;
	const { data: isBookmarked, refetch } = useQuery({
		initialData: false,
		queryKey: ["bookmark", id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("user_articles")
				.select("user_id")
				.eq("user_id", user.id)
				.eq("article_id", id)
				.single();

			if (error) {
				return false;
			}

			return Boolean(data);
		}
	});

	const onShare = () => {
		Share.share({
			title: title,
			url: original_url
		});
	};

	const onBookmark = async () => {
		if (isBookmarked) {
			const { error } = await supabase.from("user_articles").delete().eq("user_id", user.id).eq("article_id", id);

			if (error) {
				Alert.alert("Error", "Couldn't delete bookmark.");
			}
		} else {
			const { error } = await supabase.from("user_articles").insert({
				user_id: user.id,
				article_id: id
			});

			if (error) {
				Alert.alert("Error", "Couldn't create bookmark.");
			}
		}

		refetch();

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
		<React.Fragment>
			<StatusBar barStyle="dark-content" />
			<WebView
				style={styles.webview}
				originWhitelist={["*"]}
				source={{
					uri: original_url
				}}
			/>
		</React.Fragment>
	);
};
