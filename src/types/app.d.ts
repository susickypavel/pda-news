/* eslint-disable @typescript-eslint/no-empty-interface */

import type { BadgeCategory } from "./theme";

export type RootStackParamList = {
	Home: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ArticleDetail: {
		original_url: string;
	};
	Settings: undefined;
	AccountSettings: undefined;
	InterestsSettings: undefined;
	LocationSettings: undefined;
	NotificationsSettings: undefined;
	CategoryDetails: {
		category: BadgeCategory;
	};
	InterestSubpage: {
		category: string;
	};
};

export type RootStackScreens = keyof RootStackParamList;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
