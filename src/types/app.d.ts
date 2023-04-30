/* eslint-disable @typescript-eslint/no-empty-interface */

import type { ArticleData } from "../stores/daily-feed";
import type { BadgeCategory } from "./theme";

export type RootStackParamList = {
	Home: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ArticleDetail: ArticleData;
	Settings: undefined;
	AccountSettings: undefined;
	InterestsSettings: undefined;
	LocationSettings: undefined;
	NotificationsSettings: undefined;
	CategoryDetails: {
		category: BadgeCategory;
	};
	InterestSubpage: undefined;
};

export type RootStackScreens = keyof RootStackParamList;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
