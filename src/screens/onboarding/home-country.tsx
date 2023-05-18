import React, { PropsWithChildren } from "react";
import { View } from "react-native";

type HomeCountryProps = PropsWithChildren<unknown>;

export const HomeCountry: React.FC<HomeCountryProps> = () => {
	return <View />;
};

HomeCountry.displayName = "HomeCountry";
