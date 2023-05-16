import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useEffect } from "react";

import { useAuth } from "@/context/auth";
import { ArticleDetailScreen } from "@/screens/article-detail";
import { HomeScreen } from "@/screens/home";
import { AccountSettingsScreen } from "@/screens/settings/account";
import { SettingsScreen } from "@/screens/settings/settings";
import { SignInScreen } from "@/screens/sign-in";
import { SignUpScreen } from "@/screens/sign-up";
import { InterestSubpageScreen } from "@/screens/tabs/explore/interest-subpage";
import { RootStackParamList } from "@/types/app";

const Stack = createNativeStackNavigator<RootStackParamList>();

const defaultScreenOptions = {
	headerShown: false
};

export const ApplicationRoot: React.FC = () => {
	const session = useAuth();

	useEffect(() => {
		async function hideSplashScreen() {
			await SplashScreen.hideAsync();
		}

		hideSplashScreen();
	}, []);

	if (!session) {
		return (
			<Stack.Navigator initialRouteName="SignIn" screenOptions={defaultScreenOptions}>
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
			</Stack.Navigator>
		);
	}

	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={defaultScreenOptions}>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
			<Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
			<Stack.Screen name="InterestSubpage" component={InterestSubpageScreen} />
			<Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
		</Stack.Navigator>
	);
};
