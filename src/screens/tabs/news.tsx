import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ArticlePreview } from "@/components/article-preview";
import { useDailyFeed } from "@/stores/daily-feed";

export const NewsTab: React.FC = () => {
	const { articles, init } = useDailyFeed();

	useEffect(() => {
		async function fetchFeed() {
			await init();

			// TODO: Handle error
		}

		fetchFeed();
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
		gap: 32,
		padding: 8
	}
});
