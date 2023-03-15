import { Text } from "@rneui/base";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { SignInForm } from "@/components/signin-form";

export default function SignIn() {
	return (
		<View style={styles.container}>
			<SignInForm />
			<Link href="/sign-up">
				<Text>Create account</Text>
			</Link>
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
