import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";

import { useAuthSafe } from "@/context/auth";

import { ArticleFeed } from "./article-feed";
import { GPSBasedNews } from "./gps-based-news";
import { NewsFeedTabBar } from "./news-feed-tab-bar";

const routes = [
	{ key: "home", title: "Home" },
	{ key: "local", title: "Local" }
];

type Route = {
	route: (typeof routes)[number];
};

interface NewsFeedTabViewProps {
	currentDate: Date;
}

export const NewsFeedTabView: React.FC<NewsFeedTabViewProps> = ({ currentDate }) => {
	const [index, setIndex] = React.useState(0);
	const { width } = useWindowDimensions();
	const { user } = useAuthSafe();

	const renderScene = ({ route }: Route) => {
		switch (route.key) {
			case "home":
				return <ArticleFeed currentDate={currentDate} region={user.user_metadata.home_region} />;
			case "local":
				return <GPSBasedNews currentDate={currentDate} />;
		}
	};

	return (
		<TabView
			initialLayout={{ width }}
			lazy={({ route }) => route.key === "local"}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			renderTabBar={props => <NewsFeedTabBar {...props} />}
		/>
	);
};

NewsFeedTabView.displayName = "NewsFeedTabView";
