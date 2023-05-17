import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useTheme } from "@rneui/themed";
import React, { useMemo } from "react";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
	const { theme } = useTheme();

	const containerAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP);
		return {
			opacity: animatedIndex.value === 1 ? opacity : 1
		};
	});

	const containerStyle = useMemo(
		() => [
			style,
			{
				backgroundColor: theme.colors.misc.backdrop
			},
			containerAnimatedStyle
		],
		[style, containerAnimatedStyle]
	);

	return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
