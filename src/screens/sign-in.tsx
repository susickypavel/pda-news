import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinkButton } from "@/components/common/button-link";
import withHideKeyboard from "@/components/hoc/with-hide-keyboard";
import { SignInForm } from "@/components/signin-form";
import type { RootStackParamList } from "@/types/app";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

const Screen: React.FC<SignInScreenProps> = props => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
			{...props}
		>
			<Image style={styles.illustration} source={require("@/assets/images/illustrations/sign-in.png")} />
			<SafeAreaView style={styles.safe}>
				<SignInForm />
				<LinkButton
					href="/SignUp"
					title="Create an account instead"
					buttonProps={{
						containerStyle: styles.link
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
	link: {
		marginTop: 16
	},
	safe: {
		width: "100%"
	}
});

export const SignInScreen = withHideKeyboard(Screen);
