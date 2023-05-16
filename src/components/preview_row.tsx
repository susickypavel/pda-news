import { useTheme } from "@rneui/themed";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

import { PreviewCard } from "./preview_card";

type PreviewCardsProps = {
	articles: ArticlePreviewProps[];
};

export const PreviewRow: React.FC<PreviewCardsProps> = props => {
	const { theme } = useTheme();
	const { articles } = props;

	const styles = StyleSheet.create({
		container: {
			gap: theme.spacing.sm
		}
	});

	return (
		<ScrollView horizontal contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
			{articles.map(article => (
				<PreviewCard {...article} key={article.id} />
			))}
		</ScrollView>
	);
};

PreviewRow.displayName = "PreviewRow";
