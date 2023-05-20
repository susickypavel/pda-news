import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/app";

import { OnboardingFooter } from "@/components/onboarding-footer";
import { ONBOARDING_STEPS } from "@/context/onboarding";

export type OnboardingIntroRouteProp = RouteProp<RootStackParamList, "OnboardingIntro">;

export type OnboardingIntroNavigationProp = NavigationProp<RootStackParamList, "OnboardingIntro">;

type OnboardingIntroProps = {
	route: OnboardingIntroRouteProp;
	navigation: OnboardingIntroNavigationProp;
};

export const OnboardingIntroScreen: React.FC<OnboardingIntroProps> = () => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: theme.colors.brandAlternative,
			flex: 1,
			justifyContent: "space-between",
			paddingVertical: theme.spacing.xl
		},
		description: {
			fontSize: 14,
			lineHeight: 21
		},
		illustration: {
			height: 350,
			resizeMode: "contain",
			width: "80%"
		},
		illustrationContainer: {
			alignItems: "center",
			display: "flex",
			flexDirection: "column"
		},
		textContainer: {
			alignContent: "flex-start",
			backgroundColor: theme.colors.background,
			display: "flex",
			gap: theme.spacing.md,
			paddingHorizontal: theme.spacing.lg,
			paddingVertical: 24
		},
		title: {
			fontFamily: "InterTightSemiBold",
			fontSize: 36,
			lineHeight: 38
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.illustrationContainer}>
				<Image style={styles.illustration} source={require("@/assets/images/intro.png")} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>
					Access trusted,{"\n"}premium news{"\n"}sources
				</Text>
				<Text style={styles.description}>Get a daily curation of must-read articles — all in one app.</Text>
				<Text style={styles.description}>
					Set up your personal news absorbing experience with our {ONBOARDING_STEPS.length} step process.
				</Text>
			</View>
			<OnboardingFooter />
		</SafeAreaView>
	);
};
