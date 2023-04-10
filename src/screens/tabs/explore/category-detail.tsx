import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types/app";

type CategoryDetailsScreenRouteProp = RouteProp<RootStackParamList, "CategoryDetails">;

type CategoryDetailsScreenNavigationProp = NavigationProp<RootStackParamList, "CategoryDetails">;

type CategoryDetailsScreenProps = {
	route: CategoryDetailsScreenRouteProp;
	navigation: CategoryDetailsScreenNavigationProp;
};

export const CategoryDetailsScreen: React.FC<CategoryDetailsScreenProps> = () => {
	return (
		<View>
			<Text>Category Detail</Text>
		</View>
	);
};

CategoryDetailsScreen.displayName = "CategoryDetailsScreen";
