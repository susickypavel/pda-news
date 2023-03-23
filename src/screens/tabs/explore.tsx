import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ArticlePreview } from "@/components/article-preview";

export function ExploreTab() {
	return (
		<SafeAreaView>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
				{Array.from({ length: 10 }).map((_, i) => (
					<ArticlePreview key={i} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 32,
		padding: 8
	}
});