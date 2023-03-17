
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export const AuthContext = createContext<Session | null>(null);

export function useAuth() {
	const context = useContext(AuthContext)

	if (!context) {
		throw Error('useAuth must be used within AuthProvider')
	}

	return context
}
