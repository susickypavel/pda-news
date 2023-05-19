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
		interestButton: {
			borderRadius: 20
		},
		interestTitle: {
			color: theme.colors.categories.politics.fg,
			fontSize: 14,
			lineHeight: 21,
			paddingVertical: 0,
			textTransform: "capitalize"
		},
		interestsContainer: {
			gap: theme.spacing.xs
		}
	});

	const onPress = (category: BadgeCategory) => {
		navigate("CategorySubpage", {
			category
		});
	};

	return (
		<ScrollView horizontal contentContainerStyle={styles.interestsContainer} showsHorizontalScrollIndicator={false}>
			{CATEGORIES.map(category => (
				<Button
					type="clear"
					key={category}
					containerStyle={styles.interestButton}
					buttonStyle={{
						backgroundColor: theme.colors.categories[category].bg,
						paddingHorizontal: theme.spacing.lg
					}}
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
