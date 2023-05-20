import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button, Divider, Icon, Text, useTheme } from "@rneui/themed";
import React, { Fragment, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { BookmarkSortOrder } from "@/api/queries/articles";

type FilterSheetProps = {
	currentFilter: BookmarkSortOrder;
	onChange: (filter: BookmarkSortOrder) => void;
	children: (onPress: any) => React.ReactNode;
};

type ToggleButtonProps = {
	title: string;
	filter: BookmarkSortOrder;
	currentFilter: BookmarkSortOrder;
	onChange: (filter: BookmarkSortOrder) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ filter, title, onChange, currentFilter }) => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		btnText: {
			color: theme.colors.black,
			fontFamily: "InterTightMedium",
			fontSize: 16
		},
		filterBtn: {
			backgroundColor: undefined,
			borderRadius: 5,
			justifyContent: "space-between",
			paddingHorizontal: 0,
			paddingVertical: theme.spacing.lg
		}
	});

	return (
		<Button buttonStyle={styles.filterBtn} onPress={() => onChange(filter)}>
			<Text style={styles.btnText}>{title}</Text>
			<Icon
				name={currentFilter == filter ? "check-circle" : "circle"}
				type="feather"
				color={currentFilter == filter ? theme.colors.brand : theme.colors.grey5}
			/>
		</Button>
	);
};

export const FilterSheet: React.FC<FilterSheetProps> = ({ onChange, currentFilter, children }) => {
	const { theme } = useTheme();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const onModalOpen = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const styles = StyleSheet.create({
		bottomSheetIndicator: {
			backgroundColor: theme.colors.black
		},

		contentContainer: {
			alignContent: "flex-start",
			flex: 1,
			paddingHorizontal: theme.spacing.lg
		},
		divider: {
			marginBottom: theme.spacing.md
		},
		filterTitle: {
			color: theme.colors.black,
			fontFamily: "InterTightBold",
			fontSize: 20,
			paddingBottom: theme.spacing.lg
		}
	});

	return (
		<Fragment>
			{children(onModalOpen)}
			<BottomSheetModal
				backgroundStyle={{
					backgroundColor: theme.colors.grey5
				}}
				handleIndicatorStyle={styles.bottomSheetIndicator}
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={["50%", "90%"]}
			>
				<View style={styles.contentContainer}>
					<Text style={styles.filterTitle}>Sort by</Text>
					<Divider color={theme.colors.black} style={styles.divider} width={2} />
					<ToggleButton title="A-Z" filter="a-z" onChange={onChange} currentFilter={currentFilter} />
					<ToggleButton title="Z-A" filter="z-a" onChange={onChange} currentFilter={currentFilter} />
					<ToggleButton title="Newest" filter="desc" onChange={onChange} currentFilter={currentFilter} />
					<ToggleButton title="Oldest" filter="asc" onChange={onChange} currentFilter={currentFilter} />
				</View>
			</BottomSheetModal>
		</Fragment>
	);
};

FilterSheet.displayName = "FilterSheet";
