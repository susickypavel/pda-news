import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import { useExploreFeed } from "@/api/queries/articles";
import { PreviewRow } from "@/screens/tabs/explore/preview_row";

type CategoriesCarouselProps = {
	data: ReturnType<typeof useExploreFeed>["data"];
};

export const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({ data }) => {
	const { theme } = useTheme();
	const styles = StyleSheet.create({
		heading: {
			color: theme.colors.black,
			fontSize: 24,
			fontWeight: "500",
			marginBottom: 10,
			textTransform: "capitalize"
		},
		personalSelContainer: {
			flex: 1,
			flexGrow: 0.1,
			marginHorizontal: 10,
			marginTop: 30
		},
		text: {
			color: theme.colors.black,
			fontSize: 14
		}
	});

	return (
		<React.Fragment>
			{data?.map(({ category, articles }) => {
				if (articles.length <= 0) return null;

				return (
					<React.Fragment key={category}>
						<View style={styles.personalSelContainer}>
							<Text style={styles.heading}>{category}</Text>
							<Text style={styles.text}>Latest {category} news</Text>
						</View>
						<PreviewRow articles={articles} />
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
};

CategoriesCarousel.displayName = "CategoriesCarousel";
