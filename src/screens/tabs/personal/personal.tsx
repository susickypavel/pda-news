import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { Button, Divider, Header, Icon, SearchBar, useTheme } from "@rneui/themed";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

import CustomBackdrop from "./customs-for-bottomsheet/custom-backdrop";

export const PersonalTab: React.FC = () => {
	const { navigate } = useNavigation();
	const { theme } = useTheme();
	const [query, setQuery] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("lastAdded");

	const sortArticles = (articles: ArticlePreviewProps[], sortOption = "lastAdded") => {
		if (sortOption === "a-z") {
			return articles.sort((a, b) => a.title.localeCompare(b.title, "cz", { sensitivity: "base" }));
		} else if (sortOption === "z-a") {
			return articles.sort((a, b) => b.title.localeCompare(a.title, "cz", { sensitivity: "base" }));
		} else {
			return articles.sort((a, b) => b.date - a.date);
		}
	};

	useEffect(() => {
		sortArticles(sortedArticles, selectedFilter);
	}, [selectedFilter]);

	// jenom temporary
	const articles: ArticlePreviewProps[] = [];

	const sortedArticles = sortArticles(articles, "alphabetical");

	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ["50%"], []);

	// callbacks
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
			justifyContent: "space-between"
		},
		searchBar: {
			backgroundColor: theme.colors.white,
			paddingTop: 0,
			width: "82%"
		},
		searchContainer: {
			display: "flex",
			flexDirection: "row"
		},
		title: {
			fontSize: 20,
			fontWeight: "600"
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
				<View style={{ display: "flex", justifyContent: "center" }}>
					<Icon
						name="filter"
						type="font-awesome-5"
						color="black"
						onPress={handlePresentModalPress}
						style={{ paddingBottom: 12, paddingRight: 10 }}
					/>
				</View>
				<SearchBar
					containerStyle={styles.searchBar}
					platform={Platform.OS === "ios" ? "ios" : "android"}
					onChangeText={newVal => setQuery(newVal)}
					placeholder="Search bookmarks..."
					placeholderTextColor="#888"
					cancelButtonTitle="Cancel"
					value={query}
				/>
			</View>
			{/*
			TODO: TADY PŘIDAT VIEW JAKO NA NEWS S ČLÁNKY
			*/}

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
							<Text style={{ fontSize: 20, paddingBottom: "5%" }}>Sort by</Text>
							<Divider width={1} />
							<Button buttonStyle={styles.filterBtn} onPress={() => setSelectedFilter("lastAdded")}>
								<Text style={styles.btnText}>Last Added</Text>
								{selectedFilter == "lastAdded" ? (
									<Icon name="check-square" type="feather" color="black" />
								) : (
									<Icon name="square" type="feather" color="black" />
								)}
							</Button>
							<Button buttonStyle={styles.filterBtn} onPress={() => setSelectedFilter("a-z")}>
								<Text style={styles.btnText}>Alphabetical (a-z)</Text>
								{selectedFilter == "a-z" ? (
									<Icon name="check-square" type="feather" color="black" />
								) : (
									<Icon name="square" type="feather" color="black" />
								)}
							</Button>
							<Button buttonStyle={styles.filterBtn} onPress={() => setSelectedFilter("z-a")}>
								<Text style={styles.btnText}>Alphabetical (z-a)</Text>
								{selectedFilter == "z-a" ? (
									<Icon name="check-square" type="feather" color="black" />
								) : (
									<Icon name="square" type="feather" color="black" />
								)}
							</Button>
						</View>
					</BottomSheetModal>
				</View>
			</BottomSheetModalProvider>
		</View>
	);
};
