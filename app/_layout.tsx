import { ThemeProvider } from "@rneui/themed";
import type { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

import { supabase } from "@/api/supabase";
import { ColorScheme } from "@/components/color-scheme";
import { AuthContext } from "@/context/auth";

import { theme } from "../src/theme";

const RootLayout: React.FC = () => {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const [isLoading, setLoading] = useState(true);

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

	return (
		<ThemeProvider theme={theme}>
			<AuthContext.Provider value={authSession}>
				<ColorScheme></ColorScheme>
			</AuthContext.Provider>
		</ThemeProvider>
	);
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
