import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { Icon, ListItem, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList, RootStackScreens } from "@/types/app";

type SettingsScreenRouteProp = RouteProp<RootStackParamList, "Settings">;

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, "Settings">;

type SettingsScreenProps = {
	route: SettingsScreenRouteProp;
	navigation: SettingsScreenNavigationProp;
};

const menu: { title: string; icon: string; path: RootStackScreens }[] = [
	{
		title: "Account",
		icon: "person",
		path: "AccountSettings"
	},
	{
		title: "Notifications",
		icon: "notifications",
		path: "NotificationsSettings"
	},
	{
		title: "Manage interests",
		icon: "tag",
		path: "InterestsSettings"
	},
	{
		title: "Location based news",
		icon: "gps-fixed",
		path: "LocationSettings"
	}
];

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	const styles = StyleSheet.create({
		container: {
			gap: 8
		},
		listItem: {
			width: "100%"
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			{menu.map(item => (
				<TouchableOpacity activeOpacity={0.5} key={item.path} onPress={() => navigate(item.path)}>
					<ListItem style={styles.listItem}>
						<Icon name={item.icon} color={theme.colors.black} />
						<ListItem.Content>
							<ListItem.Title>{item.title}</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
				</TouchableOpacity>
			))}
		</SafeAreaView>
	);
};

SettingsScreen.displayName = "SettingsScreen";
