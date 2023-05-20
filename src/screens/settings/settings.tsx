import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { Icon, ListItem, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { RootStackParamList, RootStackScreens } from "@/types/app";

type SettingsScreenRouteProp = RouteProp<RootStackParamList, "Settings">;

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, "Settings">;

type SettingsScreenProps = {
	route: SettingsScreenRouteProp;
	navigation: SettingsScreenNavigationProp;
};

const menu = [
	{
		title: "Account",
		icon: "person",
		path: "AccountSettings"
	},
	{
		title: "Manage interests",
		icon: "tag",
		path: "InterestsSettings"
	},
	{
		title: "Notifications",
		icon: "notifications",
		path: "NotificationsSettings",
		disabled: true
	},
	{
		title: "Location based news",
		icon: "gps-fixed",
		path: "LocationSettings",
		disabled: true
	}
] satisfies { title: string; icon: string; path: RootStackScreens; disabled?: boolean }[];

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
	const { theme } = useTheme();
	const { navigate } = useNavigation();

	const styles = StyleSheet.create({
		listItem: {
			width: "100%"
		},
		listItemContainer: {
			padding: theme.spacing.lg
		},
		listItemDisabled: {
			opacity: 0.5
		}
	});

	return (
		<React.Fragment>
			{menu.map(item => (
				<TouchableOpacity
					disabled={item.disabled}
					activeOpacity={0.5}
					key={item.path}
					onPress={() => navigate(item.path)}
				>
					<ListItem
						disabledStyle={styles.listItemDisabled}
						disabled={item.disabled}
						style={styles.listItem}
						containerStyle={styles.listItemContainer}
					>
						<Icon name={item.icon} color={theme.colors.black} />
						<ListItem.Content>
							<ListItem.Title>{item.title}</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
				</TouchableOpacity>
			))}
		</React.Fragment>
	);
};

SettingsScreen.displayName = "SettingsScreen";
