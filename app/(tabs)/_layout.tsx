import { Tabs } from "expo-router";
import React from "react";

import { TabBar } from "@/components/tab-bar";

export default function DefaultLayout() {
	return (
		<Tabs
			tabBar={TabBar}
			screenOptions={{
				headerShown: false
			}}
		/>
	);
}
