import { useNavigation } from "@react-navigation/native";
import { Icon, SearchBar, useTheme } from "@rneui/themed";
import React, { Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDebounce } from "use-debounce";

import { FilterSheet } from "@/components/filter-sheet";
import withSafeArea from "@/components/hoc/with-safe-area";
import { SavedArticlesFeed } from "@/components/saved-articles-feed";
import { BookmarkSortOrder } from "@/queries/articles";

const Tab: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [order, setOrder] = useState<BookmarkSortOrder>("desc");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 250);
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	const styles = StyleSheet.create({
		filterButton: {
			borderRadius: 4,
			padding: theme.spacing.sm
		},
		iconContainer: {
			marginRight: theme.spacing.sm
		},
		searchBar: {
			flexShrink: 1,
			paddingBottom: 0,
			paddingTop: 0
		},
		searchBarCancel: {
			color: theme.colors.primary
		},
		searchBarContainer: {
			flexDirection: "row",
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
				<FilterSheet onChange={setOrder} currentFilter={order}>
					{onPress => (
						<Icon
							name="filter-list-alt"
							backgroundColor={theme.colors.primary}
							type="material"
							size={32}
							containerStyle={styles.iconContainer}
							iconStyle={styles.filterButton}
							color="white"
							onPress={onPress}
						/>
					)}
				</FilterSheet>
				<Icon
					name="settings"
					backgroundColor={theme.colors.primary}
					type="material"
					size={32}
					iconStyle={styles.filterButton}
					containerStyle={styles.iconContainer}
					color="white"
					onPress={() => navigate("Settings")}
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
