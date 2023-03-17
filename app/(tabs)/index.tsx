import { Button, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

import { supabase } from "@/api/supabase";

export default function Home() {
	return (
		<View className="flex-1 items-center justify-center">
			<Button onPress={() => supabase.auth.signOut()}>
				<Text>Sign out</Text>
			</Button>
		</View>
	);
}
