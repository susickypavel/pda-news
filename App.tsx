import "react-native-url-polyfill/auto";

// HACK: `react-native-tab-view` throws this error for non obvious reasons.
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered."]);

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeConsumer, ThemeProvider } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/api/supabase";
import { ColorScheme } from "@/components/color-scheme";
import { AuthProvider } from "@/context/auth";
import { ArticleDetailScreen } from "@/screens/article-detail";
import { HomeScreen } from "@/screens/home";
import { SignInScreen } from "@/screens/sign-in";
import { SignUpScreen } from "@/screens/sign-up";

import type { RootStackParamList } from "./src/app";
import { theme } from "./src/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const [initialRouteName, setRoute] = useState<keyof RootStackParamList>("SignIn");
	const [isAuthStateLoaded, setAuthStateLoaded] = useState(false);
	const [isFontLoaded] = useFonts({
		InterTightBlack: require("@/assets/fonts/Black.ttf")
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
						<ThemeConsumer>
							{({ theme }) => (
								<Stack.Navigator
									initialRouteName={initialRouteName}
									screenOptions={{
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
											headerShown: true
										}}
									/>
								</Stack.Navigator>
							)}
						</ThemeConsumer>
					</AuthProvider>
				</ColorScheme>
			</ThemeProvider>
		</NavigationContainer>
	);
};

export default App;
