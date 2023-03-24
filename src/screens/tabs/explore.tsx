import { useTheme } from "@rneui/themed";
import React, { useCallback, useRef, useState } from "react";
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ArticlePreview } from "@/components/article-preview";

const { height } = Dimensions.get("window");

const SCROLL_INDICATOR_HEIGHT = 10;

export function ExploreTab() {
	const { theme } = useTheme();
	const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState(1);
	const scrollProgress = useRef(new Animated.Value(0)).current;

	const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { y } = e.nativeEvent.contentOffset;
		const contentHeight = e.nativeEvent.contentSize.height;
		const scrollViewHeight = height - SCROLL_INDICATOR_HEIGHT;

		const newProgress = y / (contentHeight - scrollViewHeight);
		scrollProgress.setValue(newProgress);
	}, []);

	return (
		<SafeAreaView>
			<Animated.View
				onLayout={e => {
					setScrollIndicatorWidth(-e.nativeEvent.layout.width);
				}}
				style={{
					width: "100%",
					height: SCROLL_INDICATOR_HEIGHT,
					backgroundColor: theme.colors.primary,
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
			<Animated.ScrollView
				scrollEventThrottle={16}
				onScroll={onScroll}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			>
				{Array.from({ length: 10 }).map((_, i) => (
					<ArticlePreview key={i} />
				))}
			</Animated.ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 32,
		padding: 8
	}
});
