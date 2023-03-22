import "react-native-url-polyfill/auto";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import * as React from "react";

import { HomeScreen } from "@/screens/home";
import { SignInScreen } from "@/screens/sign-in";
import { SignUpScreen } from "@/screens/sign-up";

import { theme } from "./src/theme";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerShown: false
					}}
				>
					<Stack.Screen name="SignIn" component={SignInScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
};

export default App;
