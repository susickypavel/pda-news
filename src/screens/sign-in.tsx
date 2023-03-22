import { useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import withHideKeyboard from "@/components/hoc/with-hide-keyboard";
import { SignInForm } from "@/components/signin-form";

function Screen(props: object) {
	const { theme } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.background
				}
			]}
			{...props}
		>
			<SignInForm />
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

export const SignInScreen = withHideKeyboard(Screen);
