import { Tabs } from "expo-router";
import React from "react";

export default function DefaultLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false
			}}
		/>
	);
}
