import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useEffect } from "react";
import { Platform } from "react-native";

import { useAuth } from "@/context/auth";
import { ArticleDetailScreen } from "@/screens/article-detail";
import { HomeScreen } from "@/screens/home";
import { AccountSettingsScreen } from "@/screens/settings/account";
import { SettingsScreen } from "@/screens/settings/settings";
import { SignInScreen } from "@/screens/sign-in";
import { SignUpScreen } from "@/screens/sign-up";
import { CategorySubpageScreen } from "@/screens/tabs/explore/category-subpage";
import { RootStackParamList } from "@/types/app";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ApplicationRoot: React.FC = () => {
	const session = useAuth();
	const { theme } = useTheme();

	useEffect(() => {
		async function hideSplashScreen() {
			await SplashScreen.hideAsync();
		}

		hideSplashScreen();
	}, []);

	if (!session) {
		return (
			<Stack.Navigator
				initialRouteName="SignIn"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
			</Stack.Navigator>
		);
	}

	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: theme.colors.primary,
				animation: Platform.OS === "ios" ? "flip" : "default",
				contentStyle: {
					backgroundColor: theme.colors.background
				},
				headerTitleStyle: {
					fontFamily: "InterTightBold"
				}
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="CategorySubpage"
				component={CategorySubpageScreen}
				options={{
					headerTintColor: theme.colors.black
				}}
			/>
			<Stack.Screen
				name="ArticleDetail"
				component={ArticleDetailScreen}
				options={{
					headerTintColor: theme.colors.black
				}}
			/>
			<Stack.Screen name="Settings" component={SettingsScreen} />
			<Stack.Screen
				name="AccountSettings"
				component={AccountSettingsScreen}
				options={{
					headerTitle: "Account"
				}}
			/>
		</Stack.Navigator>
	);
};
