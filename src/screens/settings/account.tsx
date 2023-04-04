import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types/app";

type AccountSettingsScreenRouteProp = RouteProp<RootStackParamList, "AccountSettings">;

type AccountSettingsScreenNavigationProp = NavigationProp<RootStackParamList, "AccountSettings">;

type AccountSettingsScreenProps = {
	route: AccountSettingsScreenRouteProp;
	navigation: AccountSettingsScreenNavigationProp;
};

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = () => {
	return <View />;
};

AccountSettingsScreen.displayName = "AccountSettingsScreen";
