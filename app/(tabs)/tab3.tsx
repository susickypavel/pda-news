import { Text } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Tab2() {
	return (
		<View style={styles.container}>
			<Text>Tab 3</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		padding: 20
	}
});
