import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Tab } from "@rneui/themed";
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";

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

export function HomeScreen(props: ProfileScreenProps) {
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes] = useState([
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
			renderTabBar={({ navigationState, jumpTo }) => (
				<SafeAreaView edges={["bottom"]}>
					<Tab value={index}>
						{navigationState.routes.map(route => (
							<Tab.Item title={route.title} key={route.key} onPressIn={() => jumpTo(route.key)} />
						))}
					</Tab>
				</SafeAreaView>
			)}
		/>
	);
}
