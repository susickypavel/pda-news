import { Text } from "@rneui/base";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

import { SignInForm } from "@/components/signin-form";

export default function SignInScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<SignInForm />
			<Link href="/auth/sign-up">
				<Text>Create account instead</Text>
			</Link>
		</View>
	);
}
