import { Picker } from "@react-native-picker/picker";
import { Text, useTheme } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { REGION_FULLNAME, SUPPORTED_REGIONS } from "src/constants";

import { OnboardingFooter } from "@/components/onboarding-footer";
import { useOnboarding } from "@/context/onboarding";

type OnboardingRegionProps = PropsWithChildren<unknown>;

export const OnboardingRegionScreen: React.FC<OnboardingRegionProps> = () => {
	const { theme } = useTheme();
	const { homeRegion, setHomeRegion } = useOnboarding();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: theme.colors.brandAlternative,
			flex: 1,
			paddingVertical: theme.spacing.xl
		},
		content: {
			backgroundColor: theme.colors.background,
			flex: 1,
			gap: theme.spacing.md,
			justifyContent: "center",
			padding: theme.spacing.sm
		},
		picker: {
			backgroundColor: theme.colors.background
		},
		pickerItem: {
			color: theme.colors.black
		},
		title: {
			fontFamily: "InterTightBold",
			fontSize: 24,
			textAlign: "center"
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Select your home region</Text>
				<Picker
					style={styles.picker}
					itemStyle={styles.pickerItem}
					selectionColor={theme.colors.primary}
					selectedValue={homeRegion}
					onValueChange={setHomeRegion}
				>
					{SUPPORTED_REGIONS.map(region => (
						<Picker.Item key={region} label={REGION_FULLNAME[region]} value={region} />
					))}
				</Picker>
			</View>
			<OnboardingFooter />
		</SafeAreaView>
	);
};

OnboardingRegionScreen.displayName = "OnboardingRegionScreen";
