import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import React, { Fragment, useEffect } from "react";
import { RootStackParamList } from "src/types/app";

import { CategoryFeed } from "@/components/category-feed";

type InterestSubpageScreenRouteProp = RouteProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenNavigationProp = NavigationProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenProps = {
	route: InterestSubpageScreenRouteProp;
	navigation: InterestSubpageScreenNavigationProp;
};

export const InterestSubpageScreen: React.FC<InterestSubpageScreenProps> = ({ route: { params }, navigation }) => {
	const { theme } = useTheme();

	useEffect(() => {
		navigation.setOptions({
			headerTitle: params.category.charAt(0).toUpperCase() + params.category.slice(1),
			headerStyle: {
				backgroundColor: theme.colors.categories[params.category].bg
			}
		});
	}, [navigation, params.category, theme]);

	return (
		<Fragment>
			<CategoryFeed category={params.category} />
		</Fragment>
	);
};

InterestSubpageScreen.displayName = "InterestSubpageScreen";
