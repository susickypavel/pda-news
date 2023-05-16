import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinkButton } from "@/components/common/button-link";
import withHideKeyboard from "@/components/hoc/with-hide-keyboard";
import { SignUpForm } from "@/components/signup-form";
import type { RootStackParamList } from "@/types/app";

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

const Screen: React.FC<SignUpScreenProps> = props => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
			{...props}
		>
			<Image style={styles.illustration} source={require("@/assets/images/illustrations/sign-up.png")} />
			<SafeAreaView style={styles.safe}>
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
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "flex-end",
		padding: 16
	},
	illustration: {
		height: 300,
		resizeMode: "contain",
		width: "100%"
	},
	safe: {
		width: "100%"
	}
});

export const SignUpScreen = withHideKeyboard(Screen);
