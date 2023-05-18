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
		button: {
			gap: theme.spacing.sm,
			justifyContent: "flex-start",
			marginBottom: theme.spacing.sm
		},
		buttonTitle: {
			color: theme.colors.black,
			fontFamily: "InterTightSemiBold"
		},
		container: {
			padding: theme.spacing.sm
		},
		scrollView: {
			marginBottom: 100
		}
	});

	return (
		<View style={styles.container}>
			<Button
				icon={<Icon name="search" color={theme.colors.black} />}
				iconPosition="left"
				type="clear"
				buttonStyle={styles.button}
				titleStyle={styles.buttonTitle}
				title="Search articles..."
				onPress={() => setModalVisiblity(true)}
			/>
			<SearchModal isVisible={isSearchModalVisible} onClose={() => setModalVisiblity(false)} />
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={false}>
				<CategoryPicker />
				<CategoriesCarousel data={data} />
			</ScrollView>
		</View>
	);
};

export const ExploreTab = withSafeArea(Tab, {
	edges: ["top"]
});
