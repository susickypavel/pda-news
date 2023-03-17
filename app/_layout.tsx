import { ThemeProvider } from "@rneui/themed";
import type { Session } from "@supabase/supabase-js";
import { Slot, SplashScreen, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { supabase } from "@/api/supabase";
import { AuthContext } from "@/context/auth";

export default function DefaultLayout() {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const [isLoading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		let loadingId: NodeJS.Timeout | null = null;

		supabase.auth
			.getSession()
			.then(({ data }) => {
				setAuthSession(data.session);
			})
			.catch(reason => {
				console.log(`ERROR: Couldn't fetch session status. (${reason})`);
				setAuthSession(null);
			})
			.finally(() => {
				loadingId = setTimeout(() => {
					setLoading(false);
				}, 250);
			});

		const auth = supabase.auth.onAuthStateChange((_, session) => {
			setAuthSession(session);
		});

		return () => {
			auth.data.subscription.unsubscribe();

			if (loadingId) {
				clearTimeout(loadingId);
			}
		};
	}, []);

	useEffect(() => {
		router.replace(authSession?.user ? "/" : "/auth/sign-in");
	}, [authSession]);

	return (
		<ThemeProvider>
			{isLoading ? <SplashScreen /> : null}
			<AuthContext.Provider value={authSession}>
				<Slot />
			</AuthContext.Provider>
		</ThemeProvider>
	);
}
