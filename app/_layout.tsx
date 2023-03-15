import { ThemeProvider } from "@rneui/themed";
import type { Session } from "@supabase/supabase-js";
import { Slot, SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { supabase } from "@/api/supabase";
import { SignInForm } from "@/components/signin-form";

export default function DefaultLayout() {
	const [authSession, setAuthSession] = useState<Session | null | undefined>(undefined);

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

	if (typeof authSession === "undefined") {
		return <SplashScreen />;
	}

	if (!authSession) {
		return (
			<ThemeProvider>
				<View style={styles.container}>
					<SignInForm />
				</View>
			</ThemeProvider>
		);
	}

	return (
		<ThemeProvider>
			<Slot />
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		padding: 20
	}
});
