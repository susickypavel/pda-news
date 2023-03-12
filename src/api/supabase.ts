import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

export const supabase = createClient(Constants.expoConfig?.extra?.SUPABASE_URL, Constants.expoConfig?.extra?.SUPABASE_PUBLIC_ANON, {
	auth: {
		storage: AsyncStorage
	}
})