import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Text, useTheme } from "@rneui/themed";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/app";

import { OnboardingFooter } from "@/components/onboarding-footer";
import { useOnboarding } from "@/context/onboarding";
import type { BadgeCategory } from "@/types/theme";

export type OnboardingInterestScreenRouteProp = RouteProp<RootStackParamList, "OnboardingInterest">;

export type OnboardingInterestScreenNavigationProp = NavigationProp<RootStackParamList, "OnboardingInterest">;

type OnboardingInterestScreenProps = {
	route: OnboardingInterestScreenRouteProp;
	navigation: OnboardingInterestScreenNavigationProp;
};

const interests: { bg: string; inactive: string; title: BadgeCategory }[] = [
	{ bg: "#7DA1F6", inactive: "#B1C7FA", title: "business" },
	{ bg: "#9D9CDE", inactive: "#C4C4EB", title: "politics" },
	{ bg: "#DDC0E7", inactive: "#EBD9F1", title: "health" },
	{ bg: "#D2F776", inactive: "#E4FAAD", title: "entertainment" },
	{ bg: "#58C17B", inactive: "#9BDAB0", title: "environment" },
	{ bg: "#B68353", inactive: "#D3B598", title: "science" },
	{ bg: "#F08957", inactive: "#F29B6D", title: "food" },
	{ bg: "#F2B040", inactive: "#F7D08C", title: "sports" },
	{ bg: "#F0E360", inactive: "#F6EEA0", title: "technology" }
];

interface ItemProps {
	title: string;
	bg: string;
	inactive: string;
}

const Item: React.FC<ItemProps> = ({ title, bg, inactive }) => {
	const { theme } = useTheme();
	const { selectedInterests, addInterest, removeInterest } = useOnboarding();

	const isSelected = selectedInterests.includes(title);

	const styles = StyleSheet.create({
		item: {
			alignItems: "center",
			aspectRatio: 1,
			backgroundColor: isSelected ? bg : inactive,
			borderColor: isSelected ? theme.colors.black : theme.colors.white,
			borderRadius: 5,
			borderWidth: 1,
			flexBasis: "33%",
			flexShrink: 1,
			justifyContent: "center"
		},
		title: {
			color: isSelected ? "#000" : "#333",
			textTransform: "capitalize"
		}
	});

	function handleInterestClick(interest: string): void {
		if (isSelected) {
			removeInterest(interest);
		} else {
			addInterest(interest);
		}
	}

	return (
		<TouchableOpacity style={styles.item} onPress={() => handleInterestClick(title)}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};

export const OnboardingInterestScreen: React.FC<OnboardingInterestScreenProps> = () => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: theme.colors.brandAlternative,
			flex: 1,
			paddingVertical: theme.spacing.xl
		},
		description: {
			fontSize: 14,
			gap: theme.spacing.lg,
			lineHeight: 21,
			paddingTop: theme.spacing.lg,
			width: "100%"
		},
		list: {
			backgroundColor: theme.colors.background,
			flex: 1,
			gap: theme.spacing.sm,
			padding: theme.spacing.sm
		},
		listColumnWrapper: {
			gap: theme.spacing.sm
		},
		textContainer: {
			alignContent: "flex-start",
			backgroundColor: theme.colors.background,
			display: "flex",
			paddingHorizontal: theme.spacing.lg,
			paddingVertical: 24
		},
		title: {
			fontFamily: "InterTightBold",
			fontSize: 24
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.title}>Pick your interests</Text>
				<Text style={styles.description}>
					Choose what matters to you and you’ll get personalised daily reading suggestions, alongside wider
					curated articles. Change your interests anytime in Settings.
				</Text>
			</View>
			<FlatList
				contentContainerStyle={styles.list}
				columnWrapperStyle={styles.listColumnWrapper}
				data={interests}
				keyExtractor={item => item.title}
				renderItem={({ item }) => <Item {...item} />}
				numColumns={3}
			/>
			<OnboardingFooter />
		</SafeAreaView>
	);
};

OnboardingInterestScreen.displayName = "OnboardingInterest";
