import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import { MainTabBar, RouteData } from "@/components/main-tab-bar";
import type { RootStackParamList } from "@/types/app";

import { ExploreTab } from "./tabs/explore";
import { NewsTab } from "./tabs/news";
import { PersonalTab } from "./tabs/saved";

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

const routes: RouteData[] = [
	{ key: "news", title: "News" },
	{ key: "explore", title: "Explore" },
	{ key: "personal", title: "Saved" }
];

export const HomeScreen: React.FC<PersonalScreenProps> = () => {
	const { width } = useWindowDimensions();
	const [index, setIndex] = useState(0);

	return (
		<TabView
			initialLayout={{ width }}
			navigationState={{ index, routes }}
			swipeEnabled={false}
			renderScene={renderScene}
			onIndexChange={setIndex}
			tabBarPosition="bottom"
			renderTabBar={props => <MainTabBar {...props} />}
		/>
	);
};
