import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "src/types/app";

import { CategoryFeed } from "@/components/category-feed";
import withSafeArea from "@/components/hoc/with-safe-area";

type InterestSubpageScreenRouteProp = RouteProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenNavigationProp = NavigationProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenProps = {
	route: InterestSubpageScreenRouteProp;
	navigation: InterestSubpageScreenNavigationProp;
};

const Screen: React.FC<InterestSubpageScreenProps> = ({ route: { params } }) => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1
		},
		header: {
			backgroundColor: theme.colors.categories[params.category].bg,
			gap: theme.spacing.sm,
			padding: 20
		},
		heading: {
			fontSize: 32,
			fontWeight: "700",
			textTransform: "capitalize"
		}
	});

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.colors.categories[params.category].bg} />
			<View style={styles.header}>
				<Text style={styles.heading}>{params.category}</Text>
			</View>
			<CategoryFeed category={params.category} />
		</View>
	);
};

export const InterestSubpageScreen = withSafeArea(Screen, {
	style: {
		flex: 1
	}
});

Screen.displayName = "InterestSubpageScreen";
