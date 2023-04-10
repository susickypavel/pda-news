import { useNavigation } from "@react-navigation/native";
import { Button, Header, Icon, useTheme } from "@rneui/themed";
import React from "react";

export const PersonalTab: React.FC = () => {
	const { navigate } = useNavigation();
	const { theme } = useTheme();

	return (
		<Header
			rightComponent={
				<Button type="clear" onPress={() => navigate("Settings")}>
					<Icon name="settings" color={theme.colors.black} size={32} />
				</Button>
			}
		/>
	);
};
