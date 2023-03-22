import { createTheme, ThemeProvider } from "@rneui/themed";
import * as React from "react";
import { View } from "react-native";

const theme = createTheme({
	components: {
		Button: {
			raised: false
		}
	}
});

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<View></View>
		</ThemeProvider>
	);
};

export default App;
