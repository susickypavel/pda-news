import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types/app";

type InterestsSettingsScreenRouteProp = RouteProp<RootStackParamList, "InterestsSettings">;

type InterestsSettingsScreenNavigationProp = NavigationProp<RootStackParamList, "InterestsSettings">;

type InterestsSettingsScreenProps = {
	route: InterestsSettingsScreenRouteProp;
	navigation: InterestsSettingsScreenNavigationProp;
};

export const InterestsSettingsScreen: React.FC<InterestsSettingsScreenProps> = () => {
	return <View />;
};

InterestsSettingsScreen.displayName = "InterestsSettingsScreen";
