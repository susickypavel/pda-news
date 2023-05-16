import { Icon, Text, useTheme } from "@rneui/themed";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { type NavigationState, type SceneRendererProps, TabBar, TabBarItem } from "react-native-tab-view";
import type { Props } from "react-native-tab-view/lib/typescript/src/TabBarItem";

type MainTabBarProps = SceneRendererProps & {
	navigationState: NavigationState<RouteData>;
};

type IconData = {
	[key: string]: {
		type: "ionicon";
		name: string;
		nameActive: string;
	};
};

const icons = {
	news: { type: "ionicon", name: "ios-newspaper-outline", nameActive: "ios-newspaper" },
	explore: { type: "ionicon", name: "compass-outline", nameActive: "compass" },
	personal: { type: "ionicon", name: "bookmarks-outline", nameActive: "bookmarks" }
} as const satisfies IconData;

export type RouteData = {
	key: keyof typeof icons;
	title: string;
};

type MainTabBarItemProps = Props<RouteData> & {
	key: string;
};

const MainTabBarItem: React.FC<MainTabBarItemProps> = props => {
	return (
		<TabBarItem
			{...props}
			renderLabel={({ color }) => <Text style={{ color, fontFamily: "InterTightSemiBold" }}>{props.route.title}</Text>}
			renderIcon={({ color, focused }) => (
				<Icon
					style={{
						marginBottom: 8
					}}
					iconStyle={{ color }}
					type={icons[props.route.key].type}
					name={focused ? icons[props.route.key].nameActive : icons[props.route.key].name}
				/>
			)}
		/>
	);
};

export const MainTabBar: React.FC<MainTabBarProps> = props => {
	const { theme } = useTheme();

	return (
		<SafeAreaView edges={["bottom"]}>
			<TabBar
				activeColor={theme.colors.black}
				inactiveColor={theme.colors.grey3}
				renderIndicator={() => null}
				renderTabBarItem={props => <MainTabBarItem {...props} />}
				style={{
					backgroundColor: theme.colors.background
				}}
				{...props}
			/>
		</SafeAreaView>
	);
};

MainTabBar.displayName = "MainTabBar";
