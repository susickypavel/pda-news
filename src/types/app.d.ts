/* eslint-disable @typescript-eslint/no-empty-interface */

import { ArticleData } from "../stores/daily-feed";

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
		category: string
	};
};

export type RootStackScreens = keyof RootStackParamList;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
