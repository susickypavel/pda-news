import React, { Fragment, useState } from "react";
import { StyleSheet } from "react-native";

import { ArticleFeed } from "@/components/article-feed";
import { HistoryPicker } from "@/components/history-picker";
import withSafeArea from "@/components/hoc/with-safe-area";

const Tab: React.FC = () => {
	const [currentDate, setCurrentDate] = useState(() => {
		const date = new Date();

		date.setHours(0, 0, 0, 0);

		return date;
	});

	return (
		<Fragment>
			<HistoryPicker onChange={setCurrentDate} />
			<ArticleFeed currentDate={currentDate} />
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export const NewsTab = withSafeArea(Tab, { edges: ["top"], style: styles.container });

NewsTab.displayName = "NewsTab";
