import { Button, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import { supabase } from "@/api/supabase";

export default function Home() {
	return (
		<View style={styles.container}>
			<Button onPress={() => supabase.auth.signOut()}>
				<Text>Sign out</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	}
})
