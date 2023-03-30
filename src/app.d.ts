/* eslint-disable @typescript-eslint/no-empty-interface */

import { ArticleData } from "./stores/explore-feed";

export type RootStackParamList = {
	Home: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ArticleDetail: ArticleData;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
