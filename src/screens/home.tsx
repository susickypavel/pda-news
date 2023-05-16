import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Icon, Text, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";

import type { RootStackParamList } from "@/types/app";

import { ExploreTab } from "./tabs/explore";
import { NewsTab } from "./tabs/news";
import { PersonalTab } from "./tabs/personal/personal";

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
		type: "ionicon";
		name: string;
		nameActive: string;
	};
};

const icons = {
	news: { type: "ionicon", name: "ios-newspaper-outline", nameActive: "ios-newspaper" },
	explore: { type: "ionicon", name: "compass-outline", nameActive: "compass" },
	personal: { type: "ionicon", name: "person-outline", nameActive: "person" }
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
			swipeEnabled={false}
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
									renderLabel={({ color }) => (
										<Text style={{ color, fontFamily: "InterTightSemiBold" }}>
											{props.route.title}
										</Text>
									)}
									renderIcon={({ color, focused }) => (
										<Icon
											style={{
												marginBottom: 8
											}}
											iconStyle={{ color }}
											type={icons[props.route.key].type}
											name={
												focused
													? icons[props.route.key].nameActive
													: icons[props.route.key].name
											}
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
