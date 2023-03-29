import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExploreFeed } from "src/stores/explore-feed";

import { ArticlePreview } from "@/components/article-preview";

export const ExploreTab: React.FC = () => {
	const { articles, init } = useExploreFeed();

	useEffect(() => {
		init();
	}, [init]);

	return (
		<SafeAreaView edges={["top"]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
				{articles.map((article, i) => (
					<ArticlePreview {...article} key={i} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
		padding: 8
	}
});
