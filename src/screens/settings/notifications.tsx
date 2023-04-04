import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types/app";

type NotificationsSettingsScreenRouteProp = RouteProp<RootStackParamList, "NotificationsSettings">;

type NotificationsSettingsScreenNavigationProp = NavigationProp<RootStackParamList, "NotificationsSettings">;

type NotificationsSettingsScreenProps = {
	route: NotificationsSettingsScreenRouteProp;
	navigation: NotificationsSettingsScreenNavigationProp;
};

export const NotificationsSettingsScreen: React.FC<NotificationsSettingsScreenProps> = () => {
	return <View />;
};

NotificationsSettingsScreen.displayName = "NotificationsSettingsScreen";
