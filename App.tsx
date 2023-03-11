import { createTheme, ThemeProvider } from "@rneui/themed";
import * as React from "react";

import { LoginScreen } from "./src/screens/login-screen";

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
			<LoginScreen />
		</ThemeProvider>
	);
};

export default App;
