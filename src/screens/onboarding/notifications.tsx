import React, { PropsWithChildren } from "react";
import { View } from "react-native";

type OnboardingNotificationProps = PropsWithChildren<unknown>;

export const OnboardingNotificationScreen: React.FC<OnboardingNotificationProps> = () => {
	return <View />;
};

OnboardingNotificationScreen.displayName = "OnboardingNotification";

// import { NavigationProp, RouteProp } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
// import { useTheme } from "@rneui/themed";
// import React from "react";
// import { useContext } from "react";
// import { Text } from "react-native";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RootStackParamList } from "src/types/app";

// import { supabase } from "@/api/supabase";

// import { OnboardingContext } from "./onboarding-context";

// export type NotificationPickScreenRouteProp = RouteProp<RootStackParamList, "NotificationPick">;

// export type NotificationPickScreenNavigationProp = NavigationProp<RootStackParamList, "NotificationPick">;

// type NotificationScreenProps = {
// 	route: NotificationPickScreenRouteProp;
// 	navigation: NotificationPickScreenNavigationProp;
// };

// const Notifications = [
// 	{ bg: "#7DA1F6", inactive: "#B1C7FA", title: "Business" },
// 	{ bg: "#D2F776", inactive: "#E4FAAD", title: "Entertainment" },
// 	{ bg: "#58C17B", inactive: "#9BDAB0", title: "Enviroment" },
// 	{ bg: "#F08957", inactive: "#F29B6D", title: "Food" },
// 	{ bg: "#DDC0E7", inactive: "#EBD9F1", title: "Health" },
// 	{ bg: "#9D9CDE", inactive: "#C4C4EB", title: "Politics" },
// 	{ bg: "#B68353", inactive: "#D3B598", title: "Science" },
// 	{ bg: "#F2B040", inactive: "#F7D08C", title: "Sports" },
// 	{ bg: "#F0E360", inactive: "#F6EEA0", title: "Technology" }
// ];

// export const NotificationPickScreen: React.FC<NotificationScreenProps> = () => {
// 	const { theme } = useTheme();
// 	const navigation = useNavigation();

// 	const styles = StyleSheet.create({
// 		blackDot: {
// 			backgroundColor: "black"
// 		},
// 		container: {
// 			flex: 1,
// 			justifyContent: "space-between",
// 			paddingTop: 16
// 		},
// 		containerDots: {
// 			alignContent: "center",
// 			display: "flex",
// 			flexDirection: "row",
// 			paddingLeft: 4,
// 			paddingTop: 24
// 		},
// 		continueBtn: {
// 			backgroundColor: "#9D9CD9",
// 			borderRadius: 35,
// 			paddingHorizontal: 32,
// 			paddingVertical: 16
// 		},
// 		continueText: {
// 			fontSize: 20
// 		},
// 		description: {
// 			gap: 16,
// 			paddingTop: 16,
// 			width: "100%"
// 		},
// 		dot: {
// 			borderRadius: 5,
// 			height: 8,
// 			marginHorizontal: 5,
// 			width: 8
// 		},
// 		grayDot: {
// 			backgroundColor: "gray"
// 		},
// 		navContainer: {
// 			alignContent: "center",
// 			display: "flex",
// 			flexDirection: "row",
// 			justifyContent: "space-between",
// 			paddingHorizontal: 32,
// 			paddingVertical: 30
// 		},
// 		textContainer: {
// 			alignContent: "flex-start",
// 			backgroundColor: theme.colors.background,
// 			display: "flex",
// 			paddingHorizontal: 16,
// 			paddingVertical: 24
// 		},
// 		title: {
// 			fontSize: 36,
// 			lineHeight: 38
// 		}
// 	});

// 	const { currentStep, navigateToIntro, navigateToInterestsPick } = useContext(OnboardingContext);

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.textContainer}>
// 				<Text style={styles.title}>Add your Notifications</Text>
// 				<View style={styles.description}>
// 					<Text>Only prepared screen for notification settings.</Text>
// 				</View>
// 			</View>
// 			<View style={styles.navContainer}>
// 				<View style={styles.containerDots}>
// 					<TouchableOpacity
// 						style={[styles.dot, currentStep === 1 ? styles.blackDot : styles.grayDot]}
// 						onPress={navigateToIntro}
// 					/>
// 					<TouchableOpacity
// 						style={[styles.dot, currentStep === 2 ? styles.blackDot : styles.grayDot]}
// 						onPress={navigateToInterestsPick}
// 					/>
// 					<TouchableOpacity style={[styles.dot, currentStep === 3 ? styles.blackDot : styles.grayDot]} />
// 				</View>
// 				<TouchableOpacity style={styles.continueBtn}>
// 					<Text style={styles.continueText}>Continue</Text>
// 				</TouchableOpacity>
// 			</View>
// 		</SafeAreaView>
// 	);
// };
