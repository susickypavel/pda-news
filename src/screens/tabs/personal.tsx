import { useNavigation } from "@react-navigation/native";
import { Button, Header, Icon } from "@rneui/themed";
import React from "react";

export const PersonalTab: React.FC = () => {
	const { navigate } = useNavigation();

	return (
		<Header
			rightComponent={
				<Button type="clear" onPress={() => navigate("Settings")}>
					<Icon name="settings" color="black" size={32} />
				</Button>
			}
		/>
	);
};
