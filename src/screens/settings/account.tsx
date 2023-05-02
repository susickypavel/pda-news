import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "src/types/app";

import { supabase } from "@/api/supabase";

type AccountSettingsScreenRouteProp = RouteProp<RootStackParamList, "AccountSettings">;

type AccountSettingsScreenNavigationProp = NavigationProp<RootStackParamList, "AccountSettings">;

type AccountSettingsScreenProps = {
	route: AccountSettingsScreenRouteProp;
	navigation: AccountSettingsScreenNavigationProp;
};

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = () => {
	const styles = StyleSheet.create({
		container: {
			padding: 8
		},
		signoutButton: {
			justifyContent: "space-between",
			paddingHorizontal: 16
		}
	});

	return (
		<View style={styles.container}>
			<Button
				buttonStyle={styles.signoutButton}
				title="Sign out"
				color="error"
				onPress={() => supabase.auth.signOut()}
				icon={<Icon name="logout" type="material" />}
				iconPosition="right"
			/>
		</View>
	);
};

AccountSettingsScreen.displayName = "AccountSettingsScreen";
