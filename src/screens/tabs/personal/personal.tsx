import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { Button, Divider, Header, Icon, SearchBar, useTheme } from "@rneui/themed";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

import CustomBackdrop from "./customs-for-bottomsheet/custom-backdrop";

type FilterOptions = "lastAdded" | "a-z" | "z-a";

export const PersonalTab: React.FC = () => {
	const { navigate } = useNavigation();
	const { theme } = useTheme();
	const [query, setQuery] = useState("");
	const [selectedFilter, setSelectedFilter] = useState<FilterOptions>("lastAdded");

	// const sortArticles = (articles: ArticlePreviewProps[], sortOption = "lastAdded") => {
	// 	if (sortOption === "a-z") {
	// 		return articles.sort((a, b) => a.title.localeCompare(b.title, "cz", { sensitivity: "base" }));
	// 	} else if (sortOption === "z-a") {
	// 		return articles.sort((a, b) => b.title.localeCompare(a.title, "cz", { sensitivity: "base" }));
	// 	} else {
	// 		return articles.sort((a, b) => b.date - a.date);
	// 	}
	// };

	// useEffect(() => {
	// 	sortArticles(sortedArticles, selectedFilter);
	// }, [selectedFilter]);

	// const sortedArticles = sortArticles(articles, "alphabetical");

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ["50%"], []);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const styles = StyleSheet.create({
		bottomSheetStyle: {
			borderRadius: 100
		},
		btnText: {
			fontSize: 16
		},
		container: {
			alignItems: "center",
			flex: 1,
			justifyContent: "center"
		},
		contentContainer: {
			alignContent: "flex-start",
			flex: 1,
			paddingHorizontal: 20
		},
		filterBtn: {
			backgroundColor: theme.colors.white,
			borderRadius: 5,
			justifyContent: "space-between",
			marginTop: 32,
			paddingHorizontal: 0,
			paddingVertical: 0
		},
		filterIcon: {},
		filterTitle: {
			fontSize: 20,
			paddingBottom: "5%"
		},
		searchBar: {
			backgroundColor: theme.colors.white,
			flexBasis: "0%",
			flexGrow: 1
		},
		searchBarInput: {
			marginHorizontal: 0,
			marginLeft: 0,
			marginRight: 0
		},
		searchContainer: {
			alignItems: "center",
			display: "flex",
			flexDirection: "row",
			gap: 8,
			width: "100%"
		},
		title: {
			fontSize: 20,
			fontWeight: "700"
		},
		titleContainer: {
			alignItems: "center",
			marginTop: 20,
			width: "200%"
		}
	});

	return (
		<View style={styles.container}>
			<Header
				rightComponent={
					<Button type="clear" onPress={() => navigate("Settings")}>
						<Icon name="settings" color={theme.colors.black} size={32} />
					</Button>
				}
				leftComponent={
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Bookmarks</Text>
					</View>
				}
			/>
			<View style={styles.searchContainer}>
				<Icon
					size={36}
					name="filter-list-alt"
					type="material"
					color="black"
					onPress={handlePresentModalPress}
					style={styles.filterIcon}
				/>
				<SearchBar
					containerStyle={styles.searchBar}
					inputContainerStyle={styles.searchBarInput}
					platform="ios"
					onChangeText={newVal => setQuery(newVal)}
					placeholder="Search bookmarks..."
					placeholderTextColor="#888"
					cancelButtonTitle="Cancel"
					value={query}
				/>
			</View>
			<BottomSheetModalProvider>
				<View style={styles.container}>
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={0}
						snapPoints={snapPoints}
						backdropComponent={CustomBackdrop}
						style={styles.bottomSheetStyle}
					>
						<View style={styles.contentContainer}>
							<Text style={styles.filterTitle}>Sort by</Text>
							<Divider width={1} />
							<Button buttonStyle={styles.filterBtn} onPress={() => setSelectedFilter("lastAdded")}>
								<Text style={styles.btnText}>Last Added</Text>
								<Icon
									name={selectedFilter == "lastAdded" ? "check-circle" : "square"}
									type="feather"
									color="black"
								/>
							</Button>
							<Button buttonStyle={styles.filterBtn} onPress={() => setSelectedFilter("a-z")}>
								<Text style={styles.btnText}>Alphabetical (a-z)</Text>
								<Icon
									name={selectedFilter == "a-z" ? "check-circle" : "square"}
									type="feather"
									color="black"
								/>
							</Button>
							<Button buttonStyle={styles.filterBtn} onPress={() => setSelectedFilter("z-a")}>
								<Text style={styles.btnText}>Alphabetical (z-a)</Text>
								<Icon
									name={selectedFilter == "z-a" ? "check-circle" : "square"}
									type="feather"
									color="black"
								/>
							</Button>
						</View>
					</BottomSheetModal>
				</View>
			</BottomSheetModalProvider>
		</View>
	);
};
