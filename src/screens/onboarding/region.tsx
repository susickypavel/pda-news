import { useTheme } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingFooter } from "@/components/onboarding-footer";

type OnboardingRegionProps = PropsWithChildren<unknown>;

export const OnboardingRegionScreen: React.FC<OnboardingRegionProps> = () => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: theme.colors.brandAlternative,
			flex: 1,
			paddingVertical: theme.spacing.xl
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1 }} />
			<OnboardingFooter />
		</SafeAreaView>
	);
};

OnboardingRegionScreen.displayName = "OnboardingRegionScreen";
