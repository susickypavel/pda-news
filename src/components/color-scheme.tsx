import { useThemeMode } from "@rneui/themed";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";

type ColorSchemeProps = {
	children: JSX.Element;
};

export const ColorScheme: React.FC<ColorSchemeProps> = ({ children }) => {
	const colorMode = useColorScheme();
	const { setMode } = useThemeMode();

	useEffect(() => {
		setMode(colorMode ? colorMode : "light");
	}, [colorMode]);

	return children;
};
