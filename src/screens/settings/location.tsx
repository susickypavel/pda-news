import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types/app";

type LocationSettingsScreenRouteProp = RouteProp<RootStackParamList, "LocationSettings">;

type LocationSettingsScreenNavigationProp = NavigationProp<RootStackParamList, "LocationSettings">;

type LocationSettingsScreenProps = {
	route: LocationSettingsScreenRouteProp;
	navigation: LocationSettingsScreenNavigationProp;
};

export const LocationSettingsScreen: React.FC<LocationSettingsScreenProps> = () => {
	return <View />;
};

LocationSettingsScreen.displayName = "LocationSettingsScreen";
