import { StackActions, useNavigation } from "@react-navigation/native";
import type { Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect } from "react";

import { supabase } from "@/api/supabase";

export const AuthContext = createContext<Session | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
	onChange: (value: Session | null) => void;
	value: Session | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, value, onChange }) => {
	const navigation = useNavigation();

	useEffect(() => {
		const auth = supabase.auth.onAuthStateChange((event, session) => {
			switch (event) {
				case "SIGNED_IN":
					navigation.dispatch(StackActions.replace("Home"));
					break;
				case "SIGNED_OUT":
					navigation.dispatch(StackActions.replace("SignIn"));
					break;
			}

			onChange(session);
		});

		return () => {
			auth.data.subscription.unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error("useAuth must be used within AuthProvider");
	}

	return context;
}
