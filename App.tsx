import "react-native-url-polyfill/auto";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "@/context/auth";

import { ApplicationRoot } from "./Application";
import { theme } from "./src/theme";

SplashScreen.preventAutoHideAsync();

const client = new QueryClient();

const ApplicationEntry: React.FC = () => {
	const [isAuthStateLoaded, setIsAuthStateLoaded] = useState(false);
	const [isFontLoaded] = useFonts({
		InterTightBlack: require("@/assets/fonts/inter-tight/Black.ttf"),
		InterTightRegular: require("@/assets/fonts/inter-tight/Regular.ttf"),
		InterTightMedium: require("@/assets/fonts/inter-tight/Medium.ttf"),
		InterTightSemiBold: require("@/assets/fonts/inter-tight/SemiBold.ttf"),
		InterTightBold: require("@/assets/fonts/inter-tight/Bold.ttf"),
		BitterSemiBold: require("@/assets/fonts/bitter/SemiBold.ttf")
	});

	const onAuthStateLoad = (value: boolean) => setIsAuthStateLoaded(value);

	return (
		<AuthProvider onAuthStateLoad={onAuthStateLoad}>
			<QueryClientProvider client={client}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<NavigationContainer>
						{isFontLoaded && isAuthStateLoaded ? (
							<ThemeProvider theme={theme}>
								<BottomSheetModalProvider>
									<ApplicationRoot />
								</BottomSheetModalProvider>
							</ThemeProvider>
						) : null}
					</NavigationContainer>
				</GestureHandlerRootView>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default ApplicationEntry;
