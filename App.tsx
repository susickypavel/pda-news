import "react-native-url-polyfill/auto";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/api/supabase";
import { ColorScheme } from "@/components/color-scheme";
import { AuthProvider } from "@/context/auth";
import { HomeScreen } from "@/screens/home";
import { SignInScreen } from "@/screens/sign-in";
import { SignUpScreen } from "@/screens/sign-up";

import { theme } from "./src/theme";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [initialRouteName, setRoute] = useState("SignIn");

	const onReady = useCallback(async () => {
		if (!isLoading) {
			await SplashScreen.hideAsync();
		}
	}, [isLoading]);

	useEffect(() => {
		let loadingId: NodeJS.Timeout | null = null;

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
				loadingId = setTimeout(() => {
					setLoading(false);
				}, 250);
			});

		return () => {
			if (loadingId) {
				clearTimeout(loadingId);
			}
		};
	}, []);

	if (isLoading) {
		return null;
	}

	return (
		<NavigationContainer onReady={onReady}>
			<ThemeProvider theme={theme}>
				<ColorScheme>
					<AuthProvider value={authSession} onChange={setAuthSession}>
						<Stack.Navigator
							initialRouteName={initialRouteName}
							screenOptions={{
								headerShown: false
							}}
						>
							<Stack.Screen
								name="SignIn"
								component={SignInScreen}
								options={{
									gestureEnabled: false
								}}
							/>
							<Stack.Screen
								name="SignUp"
								component={SignUpScreen}
								options={{
									gestureEnabled: false
								}}
							/>
							<Stack.Screen name="Home" component={HomeScreen} />
						</Stack.Navigator>
					</AuthProvider>
				</ColorScheme>
			</ThemeProvider>
		</NavigationContainer>
	);
};

export default App;
