import React from "react";
import { StyleSheet, View } from "react-native";

import { SignUpForm } from "@/components/signup-form";

export default function Home() {
	return (
		<View style={styles.container}>
			<SignUpForm />
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
