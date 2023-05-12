import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Skeleton, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "src/types/app";

import { supabase } from "@/api/supabase";

import { ArticleCard } from "./article-card";

type InterestSubpageScreenRouteProp = RouteProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenNavigationProp = NavigationProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenProps = {
	route: InterestSubpageScreenRouteProp;
	navigation: InterestSubpageScreenNavigationProp;
};

export const InterestSubpageScreen: React.FC<InterestSubpageScreenProps> = ({ route: { params } }) => {
	const { data, isLoading } = useQuery(["category-articles", params.category], async () => {
		const { data, error } = await supabase
			.from("articles")
			.select("*, source_id (name)")
			.eq("category", params.category)
			.order("published_at", {
				ascending: false
			})
			.limit(10);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			paddingBottom: 100
		},
		loadingContainer: {
			gap: 10,
			margin: 10
		},
		scrollView: {
			marginHorizontal: 10
		},
		title: {
			fontSize: 32,
			fontWeight: "500",
			textTransform: "capitalize"
		},
		titleContainer: {
			backgroundColor: theme.colors.categories[params.category].bg,
			flexDirection: "row",
			justifyContent: "space-between",
			paddingBottom: 20,
			paddingLeft: 20
		}
	});

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.colors.categories[params.category].bg} />
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{params.category}</Text>
			</View>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<Skeleton animation="pulse" height={250} />
					<Skeleton animation="pulse" height={250} />
					<Skeleton animation="pulse" height={250} />
				</View>
			) : (
				<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
					{data?.map(article => (
						<ArticleCard {...article} key={article.id} />
					))}
				</ScrollView>
			)}
		</View>
	);
};

InterestSubpageScreen.displayName = "InterestSubpageScreen";
