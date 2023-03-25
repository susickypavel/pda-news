import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

export const NewsTab: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>News Tab</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	}
});
