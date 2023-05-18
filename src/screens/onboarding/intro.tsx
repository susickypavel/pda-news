import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { useContext } from "react";
import { Text } from "react-native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/app";

import { supabase } from "@/api/supabase";

import { OnboardingContext } from "./onboarding-context";

export type OnboardingScreenRouteProp = RouteProp<RootStackParamList, "Onboarding">;

export type OnboardingScreenNavigationProp = NavigationProp<RootStackParamList, "Onboarding">;

type OnboardingScreenProps = {
	route: OnboardingScreenRouteProp;
	navigation: OnboardingScreenNavigationProp;
};

export const IntroScreen: React.FC<OnboardingScreenProps> = () => {
	const { theme } = useTheme();
	const navigation = useNavigation();

	const styles = StyleSheet.create({
		blackDot: {
			backgroundColor: "black"
		},
		container: {
			backgroundColor: "#9D9CD9",
			flex: 1,
			justifyContent: "space-around"
			// paddingTop: 80
		},
		containerDots: {
			flexDirection: "row",
			justifyContent: "flex-start",
			// marginBottom: 8,
			marginTop: 48
			// paddingHorizontal: 16
		},
		description: {
			gap: 16,
			paddingTop: 16,
			width: "100%"
		},
		dot: {
			borderRadius: 5,
			height: 8,
			marginHorizontal: 5,
			width: 8
		},
		grayDot: {
			backgroundColor: "gray"
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
		navContainer: {
			alignContent: "center",
			backgroundColor: "#9D9CD9",
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			paddingHorizontal: 32,
			paddingVertical: 30
		},
		textContainer: {
			alignContent: "flex-start",
			backgroundColor: theme.colors.background,
			display: "flex",
			paddingHorizontal: 16,
			paddingVertical: 24
		},
		title: {
			fontSize: 36,
			lineHeight: 38
		}
	});
	const { currentStep, setCurrentStep, onSkip, navigateToInterestsPick, navigateToNotificationsPick } =
		useContext(OnboardingContext);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.illustrationContainer}>
				<Image style={styles.illustration} source={require("@/assets/images/intro.png")} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>
					Access trusted,{"\n"}premium news{"\n"}sources
				</Text>
				<View style={styles.description}>
					<Text>Get a daily curation of must-read articles — all in one app.</Text>
					<Text>Set up your personal news absorbing experience with our 3 step process.</Text>
				</View>
				<View style={styles.containerDots}>
					<TouchableOpacity style={[styles.dot, currentStep === 1 ? styles.blackDot : styles.grayDot]} />
					<TouchableOpacity
						style={[styles.dot, currentStep === 2 ? styles.blackDot : styles.grayDot]}
						onPress={navigateToInterestsPick}
					/>
					<TouchableOpacity
						style={[styles.dot, currentStep === 3 ? styles.blackDot : styles.grayDot]}
						onPress={navigateToNotificationsPick}
					/>
				</View>
			</View>

			<View style={styles.navContainer}>
				<TouchableOpacity onPress={onSkip}>
					<Text style={{ fontWeight: "500", fontSize: 16, marginTop: 2 }}>Skip</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={navigateToInterestsPick}>
					<Icon name="long-arrow-right" type="font-awesome" color="black" size={26} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
