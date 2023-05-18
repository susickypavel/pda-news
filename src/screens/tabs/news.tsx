import { Button } from "@rneui/themed";
import * as Location from "expo-location";
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
			<Button
				title="GPS TEST"
				onPress={async () => {
					try {
						const response = await Location.requestForegroundPermissionsAsync();

						const location = await Location.getCurrentPositionAsync();

						const geocoding = await Location.reverseGeocodeAsync({
							latitude: location.coords.latitude,
							longitude: location.coords.longitude
						});
					} catch (error) {
						console.error(error);
					}
				}}
			/>
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
