import { Icon, SearchBar, useTheme } from "@rneui/themed";
import React, { Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDebounce } from "use-debounce";

import withSafeArea from "@/components/hoc/with-safe-area";
import { SavedArticlesFeed } from "@/components/saved-articles-feed";
import { BookmarkSortOrder } from "@/queries/articles";

const Tab: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [order, setOrder] = useState<BookmarkSortOrder>("desc");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 250);
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		filterButton: {
			padding: theme.spacing.xs
		},
		searchBar: {
			backgroundColor: "transparent",
			flexShrink: 1,
			paddingBottom: 0,
			paddingTop: 0
		},
		searchBarCancel: {
			color: theme.colors.primary
		},
		searchBarContainer: {
			alignItems: "center",
			flexDirection: "row",
			gap: theme.spacing.xs,
			justifyContent: "center",
			padding: theme.spacing.sm,
			paddingBottom: 0,
			paddingRight: 0
		},
		searchBarInput: {
			marginLeft: 0
		}
	});

	return (
		<Fragment>
			<View style={styles.searchBarContainer}>
				<Icon name="filter-list-alt" type="material" size={40} iconStyle={styles.filterButton} color="black" />
				<SearchBar
					containerStyle={styles.searchBar}
					inputContainerStyle={styles.searchBarInput}
					cancelButtonProps={{
						buttonTextStyle: styles.searchBarCancel
					}}
					platform="ios"
					onChangeText={setSearchTerm}
					placeholder="Search bookmarks..."
					value={searchTerm}
				/>
			</View>
			<SavedArticlesFeed searchTerm={debouncedSearchTerm} order={order} />
		</Fragment>
	);
};

export const PersonalTab = withSafeArea(Tab, {
	edges: ["top"],
	style: {
		flex: 1
	}
});
