import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { Button, Header, Icon, useTheme } from "@rneui/themed";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";

export const PersonalTab: React.FC = () => {
	const { navigate } = useNavigation();
	const { theme } = useTheme();

	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ["25%", "50%"], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	return (
		<View style={styles.container}>
			<Header
				rightComponent={
					<Button type="clear" onPress={() => navigate("Settings")}>
						<Icon name="settings" color={theme.colors.black} size={32} />
					</Button>
				}
			/>
			<Text>Explore Tab</Text>
			<BottomSheetModalProvider>
				<View style={styles.container}>
					<Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={1}
						snapPoints={snapPoints}
						onChange={handleSheetChanges}
					>
						<View style={styles.contentContainer}>
							<Text>Awesome 🎉</Text>
						</View>
					</BottomSheetModal>
				</View>
			</BottomSheetModalProvider>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	contentContainer: {
		alignItems: "center",
		flex: 1
	}
});
