import { Stack } from "expo-router";
import React from "react";

const AuthLayout: React.FC = () => {
	return (
		<Stack
			screenOptions={{
				animation: "slide_from_right",
				headerShown: false
			}}
		/>
	);
};

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
