import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
	const { data } = useQuery(["category-articles", params.category], async () => {
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

	return (
		<View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{params.category}</Text>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
				{data?.map(article => (
					<ArticleCard {...article} key={article.id} />
				))}
			</ScrollView>
		</View>
	);
};

InterestSubpageScreen.displayName = "InterestSubpageScreen";

const styles = StyleSheet.create({
	scrollView: {
		marginHorizontal: 10
	},
	title: {
		fontSize: 32,
		fontWeight: "500",
		textTransform: "capitalize"
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: 20,
		paddingBottom: 10
	}
});
