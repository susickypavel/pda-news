/* eslint-disable @typescript-eslint/no-empty-interface */

import { Database } from "./supabase";
import type { BadgeCategory } from "./theme";

export type RootStackParamList = {
	Home: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ArticleDetail: Database["public"]["Functions"]["get_user_feed"]["Returns"][0] & {
		category: BadgeCategory
	};
	Settings: undefined;
	AccountSettings: undefined;
	InterestsSettings: undefined;
	LocationSettings: undefined;
	NotificationsSettings: undefined;
	CategorySubpage: {
		category: BadgeCategory;
	};
};

export type RootStackScreens = keyof RootStackParamList;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
