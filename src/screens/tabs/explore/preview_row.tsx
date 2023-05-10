import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

import { PreviewCard } from "./preview_card";

type PreviewCardsProps = {
	articles: ArticlePreviewProps[];
};

export const PreviewRow: React.FC<PreviewCardsProps> = props => {
	const { articles } = props;

	return (
		<ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
			{articles.map(article => (
				<PreviewCard {...article} key={article.title} />
			))}
		</ScrollView>
	);
};

PreviewRow.displayName = "ArticlePreview";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		flexGrow: 0.5,
		marginBottom: 10,
		marginTop: 10,
		paddingHorizontal: 10
	}
});
