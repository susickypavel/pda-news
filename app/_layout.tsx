import { ThemeProvider } from "@rneui/themed";
import type { Session } from "@supabase/supabase-js";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { supabase } from "@/api/supabase";

export default function DefaultLayout() {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const router = useRouter();

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data }) => {
				setAuthSession(data.session);
			})
			.catch(reason => {
				console.log(`ERROR: Couldn't fetch session status. (${reason})`);
			});

		const auth = supabase.auth.onAuthStateChange((_, session) => {
			setAuthSession(session);
		});

		return () => auth.data.subscription.unsubscribe();
	}, []);

	useEffect(() => {
		if (!authSession || !authSession.user) {
			router.replace("/sign-in");
		} else {
			router.replace("/");
		}
	}, [authSession]);

	return (
		<ThemeProvider>
			<Stack />
		</ThemeProvider>
	);
}
