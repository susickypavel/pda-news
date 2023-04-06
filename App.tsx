import "react-native-url-polyfill/auto";

// HACK: `react-native-tab-view` throws this error for non obvious reasons.
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered."]);

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeConsumer, ThemeProvider } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/api/supabase";
import { ColorScheme } from "@/components/color-scheme";
import { SubScreenHeader } from "@/components/common/subscreen-header";
import { AuthProvider } from "@/context/auth";
import { ArticleDetailHeaderActions, ArticleDetailScreen } from "@/screens/article-detail";
import { HomeScreen } from "@/screens/home";
import { AccountSettingsScreen } from "@/screens/settings/account";
import { InterestsSettingsScreen } from "@/screens/settings/interests";
import { LocationSettingsScreen } from "@/screens/settings/location";
import { NotificationsSettingsScreen } from "@/screens/settings/notifications";
import { SettingsScreen } from "@/screens/settings/settings";
import { SignInScreen } from "@/screens/sign-in";
import { SignUpScreen } from "@/screens/sign-up";

import { theme } from "./src/theme";
import type { RootStackParamList } from "./src/types/app";

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const App: React.FC = () => {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const [initialRouteName, setRoute] = useState<keyof RootStackParamList>("SignIn");
	const [isAuthStateLoaded, setAuthStateLoaded] = useState(false);
	const [isFontLoaded] = useFonts({
		InterTightBlack: require("@/assets/fonts/inter-tight/Black.ttf"),
		InterTightRegular: require("@/assets/fonts/inter-tight/Regular.ttf"),
		InterTightMedium: require("@/assets/fonts/inter-tight/Medium.ttf"),
		InterTightSemiBold: require("@/assets/fonts/inter-tight/SemiBold.ttf"),
		BitterSemiBold: require("@/assets/fonts/bitter/SemiBold.ttf")
	});

	const onReady = useCallback(async () => {
		if (isFontLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [isFontLoaded]);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data }) => {
				setAuthSession(data.session);

				if (data.session?.user) {
					setRoute("Home");
				}
			})
			.catch(reason => {
				console.log(`ERROR: Couldn't fetch session status. (${reason})`);
				setAuthSession(null);
			})
			.finally(() => {
				setAuthStateLoaded(true);
			});
	}, []);

	if (!isFontLoaded || !isAuthStateLoaded) {
		return null;
	}

	return (
		<NavigationContainer onReady={onReady}>
			<ThemeProvider theme={theme}>
				<ColorScheme>
					<AuthProvider value={authSession} onChange={setAuthSession}>
						<QueryClientProvider client={queryClient}>
							<ThemeConsumer>
								{({ theme }) => (
									<Stack.Navigator
										initialRouteName={initialRouteName}
										screenOptions={{
											header: SubScreenHeader,
											headerShown: false,
											animation: "slide_from_right",
											contentStyle: {
												backgroundColor: theme.colors.background
											}
										}}
									>
										<Stack.Screen name="SignIn" component={SignInScreen} />
										<Stack.Screen name="SignUp" component={SignUpScreen} />
										<Stack.Screen name="Home" component={HomeScreen} />
										<Stack.Screen
											name="ArticleDetail"
											component={ArticleDetailScreen}
											options={{
												header(props) {
													return (
														<SubScreenHeader
															{...props}
															headerProps={{
																rightComponent: <ArticleDetailHeaderActions />
															}}
														/>
													);
												},
												headerShown: true
											}}
										/>
										<Stack.Screen
											name="Settings"
											component={SettingsScreen}
											options={{
												headerShown: true
											}}
										/>
										<Stack.Screen
											name="AccountSettings"
											component={AccountSettingsScreen}
											options={{
												headerShown: true
											}}
										/>
										<Stack.Screen
											name="NotificationsSettings"
											component={NotificationsSettingsScreen}
											options={{
												headerShown: true
											}}
										/>
										<Stack.Screen
											name="InterestsSettings"
											component={InterestsSettingsScreen}
											options={{
												headerShown: true
											}}
										/>
										<Stack.Screen
											name="LocationSettings"
											component={LocationSettingsScreen}
											options={{
												headerShown: true
											}}
										/>
									</Stack.Navigator>
								)}
							</ThemeConsumer>
						</QueryClientProvider>
					</AuthProvider>
				</ColorScheme>
			</ThemeProvider>
		</NavigationContainer>
	);
};

export default App;
