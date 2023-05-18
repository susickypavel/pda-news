import React, { Fragment, useState } from "react";
import { StyleSheet } from "react-native";

import { HistoryPicker } from "@/components/history-picker";
import withSafeArea from "@/components/hoc/with-safe-area";
import { NewsFeedTabView } from "@/components/news-feed-tab-view";

const Tab: React.FC = () => {
	const [currentDate, setCurrentDate] = useState(() => {
		const date = new Date();

		date.setHours(0, 0, 0, 0);

		return date;
	});

	return (
		<Fragment>
			<HistoryPicker onChange={setCurrentDate} />
			<NewsFeedTabView currentDate={currentDate} />
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8
	}
});

export const NewsTab = withSafeArea(Tab, {
	edges: ["top"],
	style: styles.container
});

NewsTab.displayName = "NewsTab";
