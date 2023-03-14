import "react-native-url-polyfill/auto";

import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import React from "react";

export default function DefaultLayout() {
	return (
		<ThemeProvider>
			<Stack />
		</ThemeProvider>
	);
}
