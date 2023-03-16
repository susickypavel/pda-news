import { Text } from "@rneui/base";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

import { SignUpForm } from "@/components/signup-form";

export default function SignInScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<SignUpForm />
			<Link href="/auth/sign-in">
				<Text>Already have an account</Text>
			</Link>
		</View>
	);
}
