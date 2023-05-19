import { Icon, useTheme } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useOnboarding } from "@/context/onboarding";

import { OnboardingIndicator } from "./onboarding-indicator";

type OnboardingFooterProps = PropsWithChildren<unknown>;

export const OnboardingFooter: React.FC<OnboardingFooterProps> = () => {
	const { theme } = useTheme();
	const { onSkip, navigateToInterestsPick } = useOnboarding();

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
			<TouchableOpacity onPress={onSkip}>
				<Text style={styles.secondaryAction}>Skip</Text>
			</TouchableOpacity>
			<OnboardingIndicator />
			<TouchableOpacity onPress={navigateToInterestsPick}>
				<Icon name="long-arrow-right" type="font-awesome" color="black" size={26} />
			</TouchableOpacity>
		</View>
	);
};

OnboardingFooter.displayName = "OnboardingFooter";
