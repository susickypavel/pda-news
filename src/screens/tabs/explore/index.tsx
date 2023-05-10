import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

export const ExploreTab: React.FC = () => {
	// NOTE: Commented blocks are for testing the BottomSheet component
	// // ref
	// const bottomSheetRef = useRef<BottomSheet>(null);

	// // variables
	// const snapPoints = useMemo(() => ["25%", "50%"], []);

	// // callbacks
	// const handleSheetChanges = useCallback((index: number) => {
	// 	console.log("handleSheetChanges", index);
	// }, []);

	return (
		<View style={styles.container}>
			<Text>Explore Tab</Text>
			{/* <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
				<View
					style={{
						flex: 1,
						alignItems: "center"
					}}
				>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheet> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	}
});
