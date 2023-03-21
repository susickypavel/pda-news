import React from "react";
import { StyleSheet, View } from "react-native";

import { LinkButton } from "@/components/common/link-button";
import withHideKeyboard from "@/components/hoc/with-hide-keyboard";
import { SignUpForm } from "@/components/signup-form";

function SignUpScreen(props: object) {
	return (
		<View style={styles.container} {...props}>
			<SignUpForm />
			<LinkButton
				href="/auth/sign-in"
				title="Already have an account"
				buttonProps={{
					containerStyle: {
						marginTop: 12
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
		justifyContent: "center",
		padding: 16
	}
});

export default withHideKeyboard(SignUpScreen);
