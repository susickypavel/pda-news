import React, { PropsWithChildren } from "react";
import { View } from "react-native";

type OnboardingInterestProps = PropsWithChildren<unknown>;

export const OnboardingInterestScreen: React.FC<OnboardingInterestProps> = () => {
	return <View />;
};

OnboardingInterestScreen.displayName = "OnboardingInterest";

// import { NavigationProp, RouteProp } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
// import { useTheme } from "@rneui/themed";
// import { Button, Icon } from "@rneui/themed";
// import React from "react";
// import { useContext } from "react";
// import { Text } from "react-native";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { categories } from "src/theme";
// import { RootStackParamList } from "src/types/app";

// import { supabase } from "@/api/supabase";

// import { OnboardingContext } from "./onboarding-context";

// export type OnboardingInterestScreenRouteProp = RouteProp<RootStackParamList, "OnboardingInterest">;

// export type OnboardingInterestScreenNavigationProp = NavigationProp<RootStackParamList, "OnboardingInterest">;

// type OnboardingInterestScreenProps = {
// 	route: OnboardingInterestScreenRouteProp;
// 	navigation: OnboardingInterestScreenNavigationProp;
// };

// const interests = [
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

// export const OnboardingInterestScreen: React.FC<OnboardingInterestScreenProps> = () => {
// 	const { theme } = useTheme();
// 	const navigation = useNavigation();

// 	const styles = StyleSheet.create({
// 		blackDot: {
// 			backgroundColor: "black"
// 		},
// 		cardsContainer: {
// 			display: "flex",
// 			flexDirection: "column",
// 			gap: 8
// 		},
// 		categoryRowContainer: {
// 			alignItems: "center",
// 			display: "flex",
// 			flexDirection: "row",
// 			gap: 8,
// 			justifyContent: "center",
// 			paddingHorizontal: 16
// 		},
// 		container: {
// 			flex: 1,
// 			justifyContent: "space-between",
// 			paddingTop: 16
// 		},
// 		containerDots: {
// 			flexDirection: "row",
// 			justifyContent: "flex-start",
// 			// marginBottom: 8,
// 			marginTop: 64,
// 			paddingHorizontal: 16
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
// 		item: {
// 			alignItems: "center",
// 			backgroundColor: "gray",
// 			borderRadius: 5,
// 			borderWidth: 1,
// 			justifyContent: "center",
// 			paddingBottom: "14%",
// 			paddingTop: "14%",
// 			width: "32%"
// 		},
// 		navContainer: {
// 			alignContent: "center",
// 			backgroundColor: "#9D9CD9",

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
// 	const firstInterestRow = interests.slice(0, 3);
// 	const secondInterestRow = interests.slice(3, 6);
// 	const thirdInterestRow = interests.slice(6, 9);

// 	const {
// 		currentStep,
// 		setCurrentStep,
// 		addInterest,
// 		removeInterest,
// 		selectedInterests,
// 		onSkip,
// 		navigateToIntro,
// 		navigateToNotificationsPick
// 	} = useContext(OnboardingContext);

// 	const handleInterestClick = (interest: string) => {
// 		if (selectedInterests.includes(interest)) {
// 			removeInterest(interest);
// 		} else {
// 			addInterest(interest);
// 		}
// 	};

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.textContainer}>
// 				<Text style={styles.title}>Add your interests</Text>
// 				<View style={styles.description}>
// 					<Text>
// 						Choose what matters to you and you’ll get personalised daily reading suggestions, alongside
// 						wider curated articles. Change your interests anytime in Profile → Settings.
// 					</Text>
// 				</View>
// 			</View>
// 			<View style={styles.cardsContainer}>
// 				<View style={styles.categoryRowContainer}>
// 					{firstInterestRow.map((item, index) => (
// 						<TouchableOpacity
// 							key={index}
// 							style={StyleSheet.compose(styles.item, {
// 								backgroundColor: selectedInterests.includes(item.title) ? item.bg : item.inactive,
// 								borderColor: selectedInterests.includes(item.title) ? "black" : "white"
// 							})}
// 							onPress={() => handleInterestClick(item.title)}
// 						>
// 							<Text style={{ color: selectedInterests.includes(item.title) ? "black" : "#7D7D7D" }}>
// 								{item.title}
// 							</Text>
// 						</TouchableOpacity>
// 					))}
// 				</View>
// 				<View style={styles.categoryRowContainer}>
// 					{secondInterestRow.map((item, index) => (
// 						<TouchableOpacity
// 							key={index}
// 							style={StyleSheet.compose(styles.item, {
// 								backgroundColor: selectedInterests.includes(item.title) ? item.bg : item.inactive,
// 								borderColor: selectedInterests.includes(item.title) ? "black" : "white"
// 							})}
// 							onPress={() => handleInterestClick(item.title)}
// 						>
// 							<Text style={{ color: selectedInterests.includes(item.title) ? "black" : "#7D7D7D" }}>
// 								{item.title}
// 							</Text>
// 						</TouchableOpacity>
// 					))}
// 				</View>
// 				<View style={styles.categoryRowContainer}>
// 					{thirdInterestRow.map((item, index) => (
// 						<TouchableOpacity
// 							key={index}
// 							style={StyleSheet.compose(styles.item, {
// 								backgroundColor: selectedInterests.includes(item.title) ? item.bg : item.inactive,
// 								borderColor: selectedInterests.includes(item.title) ? "black" : "white"
// 							})}
// 							onPress={() => handleInterestClick(item.title)}
// 						>
// 							<Text style={{ color: selectedInterests.includes(item.title) ? "black" : "#7D7D7D" }}>
// 								{item.title}
// 							</Text>
// 						</TouchableOpacity>
// 					))}
// 				</View>
// 			</View>

// 			<View style={styles.containerDots}>
// 				<TouchableOpacity
// 					style={[styles.dot, currentStep === 1 ? styles.blackDot : styles.grayDot]}
// 					onPress={navigateToIntro}
// 				/>
// 				<TouchableOpacity style={[styles.dot, currentStep === 2 ? styles.blackDot : styles.grayDot]} />
// 				<TouchableOpacity
// 					style={[styles.dot, currentStep === 3 ? styles.blackDot : styles.grayDot]}
// 					onPress={navigateToNotificationsPick}
// 				/>
// 			</View>
// 			<View style={styles.navContainer}>
// 				<TouchableOpacity onPress={onSkip}>
// 					<Text style={{ fontWeight: "500", fontSize: 16, marginTop: 2 }}>Skip</Text>
// 				</TouchableOpacity>
// 				<TouchableOpacity onPress={navigateToNotificationsPick}>
// 					<Icon name="long-arrow-right" type="font-awesome" color="black" size={26} />
// 				</TouchableOpacity>
// 			</View>
// 		</SafeAreaView>
// 	);
// };
