import { SearchBar } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import React, { Fragment, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useExploreFeed } from "@/api/queries/articles";
import { CategoriesCarousel } from "@/components/categories-carousel";
import { CategoryPicker } from "@/components/category-picker";
import withSafeArea from "@/components/hoc/with-safe-area";

const Tab: React.FC = () => {
	const [query, setQuery] = useState("");
	const { data } = useExploreFeed();
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		searchBar: {
			backgroundColor: theme.colors.white
		}
	});

	return (
		<Fragment>
			<SearchBar
				containerStyle={styles.searchBar}
				platform="ios"
				onChangeText={newVal => setQuery(newVal)}
				placeholder="Search articles..."
				cancelButtonTitle="Cancel"
				value={query}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CategoryPicker />
				<CategoriesCarousel data={data} />
			</ScrollView>
		</Fragment>
	);
};

export const ExploreTab = withSafeArea(Tab, {
	edges: ["top"]
});
