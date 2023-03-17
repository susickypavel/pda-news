import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tab } from "@rneui/themed";
import React from "react";

export const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
	const onPress = (route: BottomTabBarProps["state"]["routes"][0]) => {
		navigation.navigate(route.name);
	};

	return (
		<Tab value={state.index}>
			{state.routes.map(route => {
				return <Tab.Item title={route.name} key={route.key} onPressIn={() => onPress(route)} />;
			})}
		</Tab>
	);
};
