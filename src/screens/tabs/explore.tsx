import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

export function ExploreTab() {
	return (
		<View style={styles.container}>
			<Text>Explore Tab</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	}
});
