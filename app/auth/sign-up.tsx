import React from "react";
import { StyleSheet, View } from "react-native";

import { LinkButton } from "@/components/common/link-button";
import { SignUpForm } from "@/components/signup-form";

export default function SignInScreen() {
	return (
		<View style={styles.container}>
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
})
