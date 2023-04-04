import { useNavigation } from "@react-navigation/native";
import { Header } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

export const PersonalTab: React.FC = () => {
	const { navigate } = useNavigation();

	return (
		<Header
			rightContainerStyle={styles.rightContainer}
			rightComponent={{
				icon: "settings",
				size: 28,
				onPress: () => navigate("Settings")
			}}
		/>
	);
};

const styles = StyleSheet.create({
	rightContainer: {
		padding: 8
	}
});
