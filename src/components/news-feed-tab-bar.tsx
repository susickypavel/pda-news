import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { type NavigationState, type SceneRendererProps, TabBar, TabBarItem } from "react-native-tab-view";
import type { Props } from "react-native-tab-view/lib/typescript/src/TabBarItem";

type NewsFeedTabBarProps = SceneRendererProps & {
	navigationState: NavigationState<RouteData>;
};

export type RouteData = {
	key: string;
	title: string;
};

type NewsFeedTabBarItemProps = Props<RouteData> & {
	key: string;
};

const NewsFeedTabBarItem: React.FC<NewsFeedTabBarItemProps> = props => {
	return (
		<TabBarItem
			{...props}
			renderLabel={({ color }) => (
				<Text style={{ color, fontFamily: "InterTightSemiBold" }}>{props.route.title}</Text>
			)}
		/>
	);
};

export const NewsFeedTabBar: React.FC<NewsFeedTabBarProps> = props => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		tabBar: {
			backgroundColor: theme.colors.background,
			marginBottom: theme.spacing.sm
		}
	});

	return (
		<TabBar
			activeColor={theme.colors.black}
			inactiveColor={theme.colors.grey3}
			indicatorStyle={{ backgroundColor: theme.colors.brand, height: 3 }}
			renderTabBarItem={props => <NewsFeedTabBarItem {...props} />}
			style={styles.tabBar}
			{...props}
		/>
	);
};

NewsFeedTabBar.displayName = "NewsFeedTabBar";
