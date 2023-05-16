import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Header, useTheme } from "@rneui/themed";
import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";
import { RootStackParamList } from "src/types/app";

import { CategoryFeed } from "@/components/category-feed";

type InterestSubpageScreenRouteProp = RouteProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenNavigationProp = NavigationProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenProps = {
	route: InterestSubpageScreenRouteProp;
	navigation: InterestSubpageScreenNavigationProp;
};

export const InterestSubpageScreen: React.FC<InterestSubpageScreenProps> = ({ route: { params } }) => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		center: {
			flex: 0
		},

		heading: {
			fontFamily: "InterTightBold",
			fontSize: 32,
			textTransform: "capitalize"
		},
		left: {
			paddingHorizontal: theme.spacing.sm,
			paddingVertical: 20
		}
	});

	return (
		<Fragment>
			<Header
				leftContainerStyle={styles.left}
				rightContainerStyle={styles.center}
				centerContainerStyle={styles.center}
				leftComponent={<Text style={styles.heading}>{params.category}</Text>}
				backgroundColor={theme.colors.categories[params.category].bg}
			/>
			<CategoryFeed category={params.category} />
		</Fragment>
	);
};

InterestSubpageScreen.displayName = "InterestSubpageScreen";
