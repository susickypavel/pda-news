import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinkButton } from "@/components/common/button-link";
import withHideKeyboard from "@/components/hoc/with-hide-keyboard";
import { SignInForm } from "@/components/signin-form";

function Screen(props: object) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
			{...props}
		>
			<SafeAreaView style={styles.safe}>
				<SignInForm />
				<LinkButton
					href="/SignUp"
					title="Create an account instead"
					buttonProps={{
						containerStyle: {
							marginTop: 16
						}
					}}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "flex-end",
		padding: 16
	},
	safe: {
		width: "100%"
	}
});

export const SignInScreen = withHideKeyboard(Screen);
