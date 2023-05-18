import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";

import { ArticleFeed } from "./article-feed";
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

	const renderScene = ({ route }: Route) => {
		switch (route.key) {
			case "home":
				return <ArticleFeed currentDate={currentDate} />;
			case "local":
				return <ArticleFeed currentDate={currentDate} region="de" />;
		}
	};

	return (
		<TabView
			initialLayout={{ width }}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			renderTabBar={props => <NewsFeedTabBar {...props} />}
		/>
	);
};

NewsFeedTabView.displayName = "NewsFeedTabView";
