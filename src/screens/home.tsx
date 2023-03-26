import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Icon, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";

import type { RootStackParamList } from "../app";
import { ExploreTab } from "./tabs/explore";
import { NewsTab } from "./tabs/news";
import { ProfileTab } from "./tabs/profile";

const renderScene = SceneMap({
	news: NewsTab,
	explore: ExploreTab,
	profile: ProfileTab
});

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type ProfileScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

type ProfileScreenProps = {
	route: ProfileScreenRouteProp;
	navigation: ProfileScreenNavigationProp;
};

type IconData = {
	[key: string]: {
		type: "material" | "material-community";
		name: string;
	};
};

const icons = {
	news: { type: "material-community", name: "newspaper" },
	explore: { type: "material", name: "search" },
	profile: { type: "material", name: "person" }
} satisfies IconData;

type RouteData = {
	key: keyof typeof icons;
	title: string;
};

export const HomeScreen: React.FC<ProfileScreenProps> = () => {
	const layout = useWindowDimensions();
	const { theme } = useTheme();

	const [index, setIndex] = useState(0);
	const [routes] = useState<RouteData[]>([
		{ key: "news", title: "News" },
		{ key: "explore", title: "Explore" },
		{ key: "profile", title: "Profile" }
	]);

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			tabBarPosition="bottom"
			renderTabBar={props => (
				<SafeAreaView edges={["bottom"]}>
					<TabBar
						renderTabBarItem={props => {
							return (
								<TabBarItem
									{...props}
									renderIcon={() => (
										<Icon
											style={{
												marginBottom: 8
											}}
											{...icons[props.route.key]}
										/>
									)}
								/>
							);
						}}
						style={{
							backgroundColor: theme.colors.background
						}}
						{...props}
					/>
				</SafeAreaView>
			)}
		/>
	);
};
