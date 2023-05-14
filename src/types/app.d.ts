/* eslint-disable @typescript-eslint/no-empty-interface */

import type { BadgeCategory } from "./theme";

export type RootStackParamList = {
	Home: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ArticleDetail: {
		title: string;
		original_url: string;
		id: string;
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
		category: BadgeCategory;
	};
};

export type RootStackScreens = keyof RootStackParamList;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
