import { supabase } from "@/api/supabase";
import { Button, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

export function ProfileTab() {
	return (
		<View style={styles.container}>
			<Text>Profile Tab</Text>
			<Button onPress={() => supabase.auth.signOut()}>Sign out</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	}
});
