import { useTheme } from "@rneui/themed";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout: React.FC = () => {
	const { theme } = useTheme();

	return (
		<Stack
			screenOptions={{
				animation: "slide_from_right",
				headerShown: false,
				contentStyle: {
					backgroundColor: theme.colors.background
				}
			}}
		/>
	);
};

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
