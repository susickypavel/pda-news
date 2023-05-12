import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
	const containerAnimatedStyle = useAnimatedStyle(() => {
		const opacity = interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP);
		return {
			opacity: animatedIndex.value === 1 ? opacity : 1 // show backdrop only on the first index
		};
	});

	const containerStyle = useMemo(
		() => [
			style,
			{
				backgroundColor: "#cdcdd07c"
			},
			containerAnimatedStyle
		],
		[style, containerAnimatedStyle]
	);

	return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
