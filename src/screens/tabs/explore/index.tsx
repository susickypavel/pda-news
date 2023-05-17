import { Button, Icon, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { useExploreFeed } from "@/api/queries/articles";
import { CategoriesCarousel } from "@/components/categories-carousel";
import { CategoryPicker } from "@/components/category-picker";
import withSafeArea from "@/components/hoc/with-safe-area";
import { SearchModal } from "@/components/search-modal";

const Tab: React.FC = () => {
	const [isSearchModalVisible, setModalVisiblity] = useState(false);
	const { data } = useExploreFeed();
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			padding: theme.spacing.sm
		},
		scrollView: {
			marginBottom: 75,
			marginTop: theme.spacing.sm
		},
		searchButton: {
			gap: theme.spacing.md,
			justifyContent: "flex-start"
		},
		searchButtonTitle: {
			fontFamily: "InterTightSemiBold"
		}
	});

	return (
		<View style={styles.container}>
			<Button
				buttonStyle={styles.searchButton}
				titleStyle={styles.searchButtonTitle}
				icon={<Icon name="search" type="ionicon" />}
				title="Search articles..."
				onPressIn={() => setModalVisiblity(true)}
			/>
			<SearchModal isVisible={isSearchModalVisible} onClose={() => setModalVisiblity(false)} />
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<CategoryPicker />
				<CategoriesCarousel data={data} />
			</ScrollView>
		</View>
	);
};

export const ExploreTab = withSafeArea(Tab, {
	edges: ["top"]
});
