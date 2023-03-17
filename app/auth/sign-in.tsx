import React from "react";
import { View } from "react-native";

import { LinkButton } from "@/components/common/link-button";
import { SignInForm } from "@/components/signin-form";

export default function SignInScreen() {
	return (
		<View className="flex-1 items-center justify-center p-4">
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
