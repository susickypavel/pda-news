import { useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ArticlePreview } from "@/components/article-preview";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const { height } = Dimensions.get("window");

const SCROLL_INDICATOR_HEIGHT = 10;

export function ExploreTab() {
	const { theme } = useTheme();
	const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState(1);
	const { scrollProgress, onScroll } = useScrollProgress(height - SCROLL_INDICATOR_HEIGHT, () => {
		console.log("End reached");
	});

	return (
		<SafeAreaView>
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
		gap: 8,
		padding: 8
	}
});
