import React from "react";
import { StyleSheet, View } from "react-native";

import withHideKeyboard from "@/components/hoc/with-hide-keyboard";
import { SignUpForm } from "@/components/signup-form";

function Screen(props: object) {
	return (
		<View style={styles.container} {...props}>
			<SignUpForm />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		padding: 16
	}
});

export const SignUpScreen = withHideKeyboard(Screen);
