import { useNavigation } from "@react-navigation/native";
import { Button, SearchBar } from "@rneui/base";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { supabase } from "@/api/supabase";

import { PreviewRow } from "./preview_row";

const interests = [
	{ color: "#F0E360", label: "Tech" },
	{ color: "#7DA1F6", label: "Business" },
	{ color: "#58C17B", label: "Climate" },
	{ color: "#DDC0E7", label: "Culture" },
	{ color: "#B68353", label: "Science" },
	{ color: "#F2B040", label: "Sports" },
	{ color: "#F08957", label: "Health" },
	{ color: "#BEAD99", label: "Personal Growth" },
	{ color: "#DF5B4B", label: "World Affairs" },
	{ color: "#A7DEE4", label: "Finance" },
	{ color: "#D2F776", label: "Economy" }
];

export const ExploreTab: React.FC = () => {
	const [query, setQuery] = useState("");
	const { data } = useQuery(["category-articles"], async () => {
		const { data, error } = await supabase.from("category_articles").select("*");

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});

	const { navigate } = useNavigation();

	const onPress = (category: string) => {
		navigate("InterestSubpage", {
			category
		});
	};

	return (
		<View style={styles.container}>
			<SearchBar
				platform="ios"
				onChangeText={newVal => setQuery(newVal)}
				placeholder="Search articles..."
				placeholderTextColor="#888"
				cancelButtonTitle="Cancel"
				value={query}
			/>
			<ScrollView>
				<ScrollView horizontal style={styles.interestsContainer} showsHorizontalScrollIndicator={false}>
					{interests.map(interest => (
						<Button
							type="clear"
							key={interest.color}
							buttonStyle={[styles.interestBtn, { backgroundColor: interest.color }]}
							titleStyle={styles.interestTitle}
							onPress={() => onPress(interest.label)}
						>
							{interest.label}
						</Button>
					))}
				</ScrollView>
				{data?.map(({ category, articles }) => {
					return (
						<React.Fragment key={category}>
							<View style={styles.personalSelContainer}>
								<Text style={styles.H2}>{category}</Text>
								<Text style={styles.text}>Latest {category} news</Text>
							</View>
							<PreviewRow articles={articles} />
						</React.Fragment>
					);
				})}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	H2: {
		color: "black",
		fontSize: 24,
		fontWeight: "500",
		marginBottom: 10,
		textTransform: "capitalize"
	},
	container: {
		flex: 1,
		paddingTop: 50
	},
	interestBtn: {
		borderRadius: 20,
		marginRight: 5,
		paddingLeft: 14,
		paddingRight: 14
	},
	interestTitle: {
		color: "#000000",
		fontSize: 14
	},

	interestsContainer: {
		flex: 1,
		flexDirection: "row",
		flexGrow: 0.1,
		marginBottom: 10,
		marginLeft: 6,
		marginTop: 10
	},
	personalSelContainer: {
		flex: 1,
		flexGrow: 0.1,
		marginHorizontal: 10,
		marginTop: 30
	},
	text: {
		color: "black",
		fontSize: 14
	}
});
