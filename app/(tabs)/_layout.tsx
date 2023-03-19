import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabBar } from "@/components/tab-bar";

export default function DefaultLayout() {
	return (
		<SafeAreaView style={styles.container} edges={["bottom"]}>
			<Tabs
				tabBar={TabBar}
				screenOptions={{
					headerShown: false
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})
