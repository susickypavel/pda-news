import type { Session } from "@supabase/supabase-js";
import React, { createContext, useContext } from "react";

export const AuthContext = createContext<Session | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
	onChange: (value: Session | null) => void;
	value: Session | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, value }) => {
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error("useAuth must be used within AuthProvider");
	}

	return context;
}
