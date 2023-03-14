import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

import { supabase } from "@/api/supabase";

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
