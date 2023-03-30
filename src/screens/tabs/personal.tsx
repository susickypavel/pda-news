import { Button, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import { supabase } from "@/api/supabase";

export const PersonalTab: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Personal Tab</Text>
			<Button onPress={() => supabase.auth.signOut()} title="Sign out" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	}
});
