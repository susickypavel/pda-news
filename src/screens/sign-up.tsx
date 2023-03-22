import React from "react";
import { StyleSheet, View } from "react-native";

import { LinkButton } from "@/components/common/button-link";
import withHideKeyboard from "@/components/hoc/with-hide-keyboard";
import { SignUpForm } from "@/components/signup-form";

function Screen(props: object) {
	return (
		<View style={styles.container} {...props}>
			<SignUpForm />
			<LinkButton
				href="/SignIn"
				title="Already have an account"
				buttonProps={{
					containerStyle: {
						marginTop: 16
					}
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "flex-end",
		padding: 16
	}
});

export const SignUpScreen = withHideKeyboard(Screen);
