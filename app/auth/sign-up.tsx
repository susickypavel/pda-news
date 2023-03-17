import React from "react";
import { View } from "react-native";

import { LinkButton } from "@/components/common/link-button";
import { SignUpForm } from "@/components/signup-form";

export default function SignInScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<SignUpForm />
			<LinkButton href="/auth/sign-in" title="Already have an account" />
		</View>
	);
}
