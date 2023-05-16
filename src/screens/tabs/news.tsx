import { Text } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { LayoutAnimation, TouchableOpacity, UIManager, View } from "react-native";

import { ArticleFeed } from "@/components/article-feed";
import { HistoryPicker } from "@/components/history-picker";
import withSafeArea from "@/components/hoc/with-safe-area";

// Enable layout animations
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const Tab: React.FC = () => {
	const [currentDate, setCurrentDate] = useState(() => {
		const date = new Date();

		date.setHours(0, 0, 0, 0);

		return date;
	});
	const [displayDateString, setDisplayDateString] = useState("");

	useEffect(() => {
		const createDateString = () => {
			const today = new Date().toDateString();
			const yesterday = new Date(Date.now() - 86400000).toDateString();

			if (currentDate.toDateString() === today) {
				return "Today";
			} else if (currentDate.toDateString() === yesterday) {
				return "Yesterday";
			} else {
				return currentDate.toDateString().slice(0, -4);
			}
		};

		const newDisplayDateString = createDateString();
		setDisplayDateString(newDisplayDateString);
	}, [currentDate]);

	const [isCollapsed, setIsCollapsed] = useState(true);
	const [gpsValue, setGPSValue] = useState(false);
	const { theme } = useTheme();

	const toggleCollapse = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

		setIsCollapsed(!isCollapsed);
	};

	return (
		<Fragment>
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={toggleCollapse} style={styles.titleContainer}>
					<Text style={styles.title}>{displayDateString}</Text>
					<Icon
						name={isCollapsed ? "down" : "up"}
						type="ant-design"
						size={24}
						color="black"
						style={{ marginTop: 6 }}
					/>
				</TouchableOpacity>
				<View style={styles.titleContainer}>
					<Text>GPS news </Text>
					<Switch
						color={theme.colors.primary}
						value={gpsValue}
						onValueChange={() => setGPSValue(!gpsValue)}
					/>
				</View>
			</View>
			{!isCollapsed && <HistoryPicker onChange={setCurrentDate} />}
			<ArticleFeed currentDate={currentDate} />
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16
	},
	title: {
		fontSize: 28,
		fontWeight: "400",
		paddingRight: 8
	},
	titleContainer: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row"
	}
});

export const NewsTab = withSafeArea(Tab, { edges: ["top"], style: styles.container });

NewsTab.displayName = "NewsTab";
