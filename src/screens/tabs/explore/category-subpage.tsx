import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import React, { useEffect } from "react";
import { RootStackParamList } from "src/types/app";

import { CategoryFeed } from "@/components/category-feed";

type CategorySubpageScreenRouteProp = RouteProp<RootStackParamList, "CategorySubpage">;

type CategorySubpageScreenNavigationProp = NavigationProp<RootStackParamList, "CategorySubpage">;

type CategorySubpageScreenProps = {
	route: CategorySubpageScreenRouteProp;
	navigation: CategorySubpageScreenNavigationProp;
};

export const CategorySubpageScreen: React.FC<CategorySubpageScreenProps> = ({ route: { params }, navigation }) => {
	const { theme } = useTheme();

	useEffect(() => {
		navigation.setOptions({
			headerTitle: params.category.charAt(0).toUpperCase() + params.category.slice(1),
			headerStyle: {
				backgroundColor: theme.colors.categories[params.category].bg
			}
		});
	}, [navigation, params.category, theme]);

	return <CategoryFeed category={params.category} />;
};

CategorySubpageScreen.displayName = "CategorySubpageScreen";
