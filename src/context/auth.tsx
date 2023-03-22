import { useNavigation } from "@react-navigation/native";
import type { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useRef } from "react";

import { supabase } from "@/api/supabase";

export const AuthContext = createContext<Session | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
	onChange: (value: Session | null) => void;
	value: Session | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, value, onChange }) => {
	const isMounted = useRef(false);
	// TODO: Type it correctly
	const navigation = useNavigation<any>();

	useEffect(() => {
		const auth = supabase.auth.onAuthStateChange((_, session) => {
			onChange(session);
		});

		return () => {
			auth.data.subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		if (value?.user) {
			navigation.navigate("Home");
		} else {
			navigation.navigate("SignIn");
		}
	}, [value]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error("useAuth must be used within AuthProvider");
	}

	return context;
}
