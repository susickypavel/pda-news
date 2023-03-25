/* eslint-disable @typescript-eslint/no-empty-interface */

export type RootStackParamList = {
	Home: undefined;
	SignIn: undefined;
	SignUp: undefined;
	ArticleDetail: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList { }
	}
}
