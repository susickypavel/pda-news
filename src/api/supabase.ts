import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

import type { Database } from "@/types/supabase";

export const supabase = createClient<Database>(
	Constants.expoConfig?.extra?.SUPABASE_URL,
	Constants.expoConfig?.extra?.SUPABASE_PUBLIC_ANON,
	{
		auth: {
			storage: AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
		}
	}
);
