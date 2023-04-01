import React from "react";
import { StyleSheet } from "react-native";

import { ArticleFeed } from "@/components/article-feed";
import withSafeArea from "@/components/hoc/with-safe-area";

const Tab: React.FC = () => {
	return <ArticleFeed />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export const NewsTab = withSafeArea(Tab, { edges: ["top"], style: styles.container });

NewsTab.displayName = "NewsTab";
