import { Icon, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useOnboarding } from "@/context/onboarding";

import { OnboardingIndicator } from "./onboarding-indicator";

export const OnboardingFooter: React.FC = () => {
	const { theme } = useTheme();
	const { onSkip, nextStep, previousStep, currentStep } = useOnboarding();

	const styles = StyleSheet.create({
		navigationContainer: {
			alignContent: "center",
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: theme.spacing.xl,
			paddingHorizontal: theme.spacing.xl
		},
		secondaryAction: {
			fontSize: 16,
			fontWeight: "500"
		}
	});

	return (
		<View style={styles.navigationContainer}>
			<TouchableOpacity onPress={currentStep === 0 ? onSkip : previousStep}>
				<Text style={styles.secondaryAction}>{currentStep === 0 ? "Skip" : "Back"}</Text>
			</TouchableOpacity>
			<OnboardingIndicator />
			<TouchableOpacity onPress={nextStep}>
				<Icon name="long-arrow-right" type="font-awesome" color="black" size={26} />
			</TouchableOpacity>
		</View>
	);
};

OnboardingFooter.displayName = "OnboardingFooter";
