import type { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import type { SupportedRegion } from "src/constants";

import { supabase } from "@/api/supabase";
import { BadgeCategory } from "@/types/theme";

export const AuthContext = createContext<Session | null | undefined>(null);

interface AuthProviderProps {
	children: React.ReactNode;
	onAuthStateLoad: (isLoaded: boolean) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, onAuthStateLoad }) => {
	const [session, setAuthSession] = useState<Session | null | undefined>(undefined);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data }) => {
				setAuthSession(data.session);
			})
			.catch(reason => {
				Alert.alert("Couldn't login", reason.message);
				setAuthSession(null);
			})
			.finally(() => {
				onAuthStateLoad(true);
			});

		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			setAuthSession(session);
		});

		return data.subscription.unsubscribe;
	}, [onAuthStateLoad]);

	return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const session = useContext(AuthContext);

	if (typeof session === "undefined") {
		throw new Error("Session is not available.");
	}

	return session;
}

export function useAuthSafe(): Session & {
	user: {
		user_metadata: {
			interests: BadgeCategory[];
			home_region: SupportedRegion;
			onboarding_finished: boolean;
		};
	};
} {
	return useContext(AuthContext) as any;
}
