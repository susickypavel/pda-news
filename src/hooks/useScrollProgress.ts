import { useCallback, useRef } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export function useScrollProgress(height: number, onEnd: () => void) {
	const hasReachedEnd = useRef(false);
	const scrollProgress = useRef(new Animated.Value(0)).current;

	const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { y } = e.nativeEvent.contentOffset;
		const contentHeight = e.nativeEvent.contentSize.height;

		const newProgress = y / (contentHeight - height);
		scrollProgress.setValue(newProgress);

		if (!hasReachedEnd.current && newProgress >= 1) {
			hasReachedEnd.current = true;
			onEnd();
		}
	}, [height, onEnd, scrollProgress]);

	return { scrollProgress, onScroll };
}
