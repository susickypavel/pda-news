import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Icon, Text, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";

import type { RootStackParamList } from "../app";
import { ExploreTab } from "./tabs/explore";
import { NewsTab } from "./tabs/news";
import { PersonalTab } from "./tabs/personal";

const renderScene = SceneMap({
	news: NewsTab,
	explore: ExploreTab,
	personal: PersonalTab
});

type PersonalScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type PersonalScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

type PersonalScreenProps = {
	route: PersonalScreenRouteProp;
	navigation: PersonalScreenNavigationProp;
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
	personal: { type: "material", name: "person-outline" }
} satisfies IconData;

type RouteData = {
	key: keyof typeof icons;
	title: string;
};

export const HomeScreen: React.FC<PersonalScreenProps> = () => {
	const layout = useWindowDimensions();
	const { theme } = useTheme();

	const [index, setIndex] = useState(0);
	const [routes] = useState<RouteData[]>([
		{ key: "news", title: "News" },
		{ key: "explore", title: "Explore" },
		{ key: "personal", title: "Personal" }
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
						renderIndicator={() => null}
						activeColor={theme.colors.black}
						inactiveColor={theme.colors.grey3}
						renderTabBarItem={props => {
							return (
								<TabBarItem
									{...props}
									renderLabel={({ color }) => <Text style={{ color }}>{props.route.title}</Text>}
									renderIcon={({ color }) => (
										<Icon
											style={{
												marginBottom: 8
											}}
											iconStyle={{ color }}
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
