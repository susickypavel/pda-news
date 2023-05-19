import { Picker } from "@react-native-picker/picker";
import { Text, useTheme } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
			justifyContent: "center",
			padding: theme.spacing.sm
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
					style={{
						backgroundColor: theme.colors.background
					}}
					selectionColor={theme.colors.primary}
					selectedValue={homeRegion}
					onValueChange={setHomeRegion}
				>
					<Picker.Item label="Czech Republic" value="cz" />
					<Picker.Item label="Germany" value="de" />
					<Picker.Item label="Great Britain" value="gb" />
				</Picker>
			</View>
			<OnboardingFooter />
		</SafeAreaView>
	);
};

OnboardingRegionScreen.displayName = "OnboardingRegionScreen";
