import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import type { RootStackParamList } from "@/types/app";

type ArticleDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ArticleDetail">;

const { height } = Dimensions.get("window");

const SCROLL_INDICATOR_HEIGHT = 10;

export const ArticleDetailScreen: React.FC<ArticleDetailsScreenProps> = ({ route, navigation }) => {
	const { content, published_at } = route.params;

	const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState(1);
	const { scrollProgress, onScroll } = useScrollProgress(height - SCROLL_INDICATOR_HEIGHT, () => {
		console.log("End reached");
	});
	const { theme } = useTheme();

	useFocusEffect(() => {
		navigation.setOptions({
			headerTitle: route.params.source_id.domain
		});
	});

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
				<Text>{published_at}</Text>
				<Text>{content}</Text>
			</Animated.ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
		padding: 8
	}
});
