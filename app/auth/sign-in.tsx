import React from "react";
import { StyleSheet, View } from "react-native";

import { LinkButton } from "@/components/common/link-button";
import { SignInForm } from "@/components/signin-form";

export default function SignInScreen() {
	return (
		<View style={styles.container}>
			<SignInForm />
			<LinkButton
				href="/auth/sign-up"
				title="Create account instead"
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
