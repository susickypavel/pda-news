import "react-native-url-polyfill/auto";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
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
	const [initialRouteName, setRoute] = useState("SignIn");
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
						<Stack.Navigator
							initialRouteName={initialRouteName}
							screenOptions={{
								headerShown: false,
								animation: "slide_from_right"
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
