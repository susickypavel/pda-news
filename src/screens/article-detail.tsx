import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import type { RootStackParamList } from "src/app";

import { useScrollProgress } from "@/hooks/useScrollProgress";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

const { height } = Dimensions.get("window");

const SCROLL_INDICATOR_HEIGHT = 10;
export const ArticleDetailScreen: React.FC<ArticleDetailsScreenProps> = () => {
	const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState(1);
	const { scrollProgress, onScroll } = useScrollProgress(height - SCROLL_INDICATOR_HEIGHT, () => {
		console.log("End reached");
	});
	const { theme } = useTheme();

	return (
		<View>
			<View
				style={{
					backgroundColor: theme.colors.grey5,
					height: SCROLL_INDICATOR_HEIGHT,
					overflow: "hidden"
				}}
			>
				<Animated.View
					onLayout={e => setScrollIndicatorWidth(-e.nativeEvent.layout.width)}
					style={{
						width: "100%",
						height: SCROLL_INDICATOR_HEIGHT,
						backgroundColor: theme.colors.primary,
						marginBottom: 8,
						transform: [
							{
								translateX: scrollProgress.interpolate({
									inputRange: [0, 1],
									outputRange: [scrollIndicatorWidth, 0],
									extrapolate: "clamp"
								})
							}
						]
					}}
				/>
			</View>
			<Animated.ScrollView
				scrollEventThrottle={16}
				onScroll={onScroll}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
				<Text>ArticleDetail</Text>
			</Animated.ScrollView>
			<Text>ArticleDetail</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
		padding: 8
	}
});
