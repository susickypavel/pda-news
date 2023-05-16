import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { BadgeCategory } from "@/types/theme";

import { CATEGORIES } from "../constants";

type CategoryPickerProps = PropsWithChildren<unknown>;

export const CategoryPicker: React.FC<CategoryPickerProps> = () => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	const styles = StyleSheet.create({
		interestBtn: {
			borderRadius: 20,
			marginRight: 5,
			paddingLeft: 14,
			paddingRight: 14
		},
		interestTitle: {
			color: theme.colors.categories.politics.fg,
			fontSize: 14,
			textTransform: "capitalize"
		},
		interestsContainer: {
			flex: 1,
			flexDirection: "row",
			flexGrow: 0.1,
			marginBottom: 10,
			marginLeft: 6,
			marginTop: 10
		}
	});

	const onPress = (category: BadgeCategory) => {
		navigate("InterestSubpage", {
			category
		});
	};

	return (
		<ScrollView horizontal style={styles.interestsContainer} showsHorizontalScrollIndicator={false}>
			{CATEGORIES.map(category => (
				<Button
					type="clear"
					key={category}
					buttonStyle={[styles.interestBtn, { backgroundColor: theme.colors.categories[category].bg }]}
					titleStyle={styles.interestTitle}
					onPress={() => onPress(category)}
				>
					{category}
				</Button>
			))}
		</ScrollView>
	);
};

CategoryPicker.displayName = "CategoryPicker";
