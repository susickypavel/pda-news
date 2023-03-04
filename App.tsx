import { createTheme, ThemeProvider } from "@rneui/themed";
import * as React from "react";
import { View } from "react-native";

import { TestComponent } from "./src/components/test-component";

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
			<View>
				<TestComponent />
			</View>
		</ThemeProvider>
	);
};

export default App;
