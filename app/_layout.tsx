import "react-native-url-polyfill/auto";

import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

import { supabase } from "../src/api/supabase";

export default function DefaultLayout() {
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			console.log(session);
		});

		supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session);
		});
	}, []);

	return (
		<ThemeProvider>
			<Stack />
		</ThemeProvider>
	);
}
