import { useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ONBOARDING_STEPS, useOnboarding } from "@/context/onboarding";

type OnboardingIndicatorProps = unknown;

export const OnboardingIndicator: React.FC<OnboardingIndicatorProps> = () => {
	const { theme } = useTheme();
	const { currentStep } = useOnboarding();

	const styles = StyleSheet.create({
		containerDots: {
			alignItems: "center",
			flexDirection: "row",
			gap: theme.spacing.lg,
			justifyContent: "center"
		},
		currentDot: {
			backgroundColor: "#000",
			transform: [{ scale: 1.25 }]
		},
		dot: {
			backgroundColor: "#fff",
			borderRadius: 4,
			height: 8,
			width: 8
		}
	});

	return (
		<View style={styles.containerDots}>
			{Array.from(ONBOARDING_STEPS).map((screen, i) => (
				<TouchableOpacity key={screen} style={[styles.dot, currentStep === i ? styles.currentDot : null]} />
			))}
		</View>
	);
};

OnboardingIndicator.displayName = "OnboardingIndicator";
