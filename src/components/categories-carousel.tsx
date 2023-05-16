import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import { useExploreFeed } from "@/api/queries/articles";

import { PreviewRow } from "./preview_row";

type CategoriesCarouselProps = {
	data: ReturnType<typeof useExploreFeed>["data"];
};

export const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({ data }) => {
	const { theme } = useTheme();
	const styles = StyleSheet.create({
		heading: {
			color: theme.colors.black,
			fontFamily: "InterTightMedium",
			fontSize: 24,
			marginBottom: theme.spacing.sm,
			textTransform: "capitalize"
		},
		text: {
			color: theme.colors.black,
			fontSize: 16,
			marginBottom: theme.spacing.md
		}
	});

	return (
		<View
			style={{
				gap: theme.spacing.xl,
				marginVertical: theme.spacing.xl
			}}
		>
			{data?.map(({ category, articles }) => {
				if (articles.length <= 0) return null;

				return (
					<View key={category}>
						<Text style={styles.heading}>{category}</Text>
						<Text style={styles.text}>Latest {category} news</Text>
						<PreviewRow articles={articles} />
					</View>
				);
			})}
		</View>
	);
};

CategoriesCarousel.displayName = "CategoriesCarousel";
