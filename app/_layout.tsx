import { ThemeProvider } from "@rneui/themed";
import type { Session } from "@supabase/supabase-js";
import { Slot, SplashScreen, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { supabase } from "@/api/supabase";

export default function DefaultLayout() {
	const [authSession, setAuthSession] = useState<Session | null | undefined>(undefined);
	const router = useRouter();

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data }) => {
				setAuthSession(data.session);
			})
			.catch(reason => {
				console.log(`ERROR: Couldn't fetch session status. (${reason})`);
				setAuthSession(null);
			});

		const auth = supabase.auth.onAuthStateChange((_, session) => {
			setAuthSession(session);
		});

		return () => auth.data.subscription.unsubscribe();
	}, []);

	useEffect(() => {
		// TODO: Fix flash of login form.
		if (!authSession?.user) {
			router.replace("/auth/sign-in");
		} else {
			router.replace("/");
		}
	}, [authSession]);

	return (
		<ThemeProvider>
			{typeof authSession === "undefined" ? <SplashScreen /> : null}
			<Slot />
		</ThemeProvider>
	);
}
