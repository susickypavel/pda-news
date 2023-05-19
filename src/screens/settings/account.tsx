import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, Icon, Input, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "src/types/app";

import { supabase } from "@/api/supabase";
import { useAuthSafe } from "@/context/auth";

type AccountSettingsScreenRouteProp = RouteProp<RootStackParamList, "AccountSettings">;

type AccountSettingsScreenNavigationProp = NavigationProp<RootStackParamList, "AccountSettings">;

type AccountSettingsScreenProps = {
	route: AccountSettingsScreenRouteProp;
	navigation: AccountSettingsScreenNavigationProp;
};

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = () => {
	const { user } = useAuthSafe();
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			padding: theme.spacing.sm
		},
		signoutButton: {
			justifyContent: "space-between",
			paddingHorizontal: theme.spacing.xl
		}
	});

	return (
		<View style={styles.container}>
			<Input label="Email" value={user.email} disabled={true} />
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
