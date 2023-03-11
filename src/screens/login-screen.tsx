import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { LoginForm } from "../components/login-form";

export const LoginScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<LoginForm />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		padding: 20
	}
});
