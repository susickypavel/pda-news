/* eslint-disable @typescript-eslint/no-empty-interface */

import { Database } from "./supabase";
import type { BadgeCategory } from "./theme";

export type RootStackParamList = {
	Home: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ArticleDetail: Database["public"]["Tables"]["articles"]["Row"] & {
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
	OnboardingIntro: undefined;
	OnboardingInterest: undefined;
	OnboardingRegion: undefined;
	NotificationPick: undefined;
};

export type RootStackScreens = keyof RootStackParamList;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
