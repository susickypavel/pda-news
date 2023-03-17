import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabBar } from "@/components/tab-bar";

export default function DefaultLayout() {
	return (
		<SafeAreaView className="flex-1" edges={["bottom"]}>
			<Tabs
				tabBar={TabBar}
				screenOptions={{
					headerShown: false
				}}
			/>
		</SafeAreaView>
	);
}
