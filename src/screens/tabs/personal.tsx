import { useNavigation } from "@react-navigation/native";
import { Header, Icon } from "@rneui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";

export const PersonalTab: React.FC = () => {
	const { navigate } = useNavigation();

	return (
		<Header
			rightComponent={
				<TouchableOpacity activeOpacity={0.5} onPress={() => navigate("Settings")}>
					<Icon name="settings" color="black" size={32} />
				</TouchableOpacity>
			}
		/>
	);
};
