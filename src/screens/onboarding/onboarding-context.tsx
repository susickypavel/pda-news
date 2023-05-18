/* eslint-disable @typescript-eslint/no-empty-function */
import { useNavigation } from "@react-navigation/native";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type OnboardingProviderProps = {
	children: ReactNode;
};

type OnboardingContextType = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	selectedInterests: string[];
	addInterest: (interest: string) => void;
	removeInterest: (interest: string) => void;
	onSkip: () => void;
	navigateToIntro: () => void;
	navigateToInterestsPick: () => void;
	navigateToNotificationsPick: () => void;
};

const OnboardingContext = createContext<OnboardingContextType>({
	currentStep: 1,
	setCurrentStep: () => {},
	selectedInterests: [],
	addInterest: () => {},
	removeInterest: () => {},
	onSkip: () => {},
	navigateToIntro: () => {},
	navigateToInterestsPick: () => {},
	navigateToNotificationsPick: () => {}
});

const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
	const navigation = useNavigation();

	const [currentStep, setCurrentStep] = useState<number>(1);
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

	const addInterest = (interest: string) => {
		setSelectedInterests(prevInterests => [...prevInterests, interest]);
	};

	const removeInterest = (interest: string) => {
		setSelectedInterests(prevInterests => prevInterests.filter(item => item !== interest));
	};

	const onSkip = () => {
		//TODO: On skip
	};

	const navigateToIntro = () => {
		setCurrentStep(1);
		navigation.navigate("Onboarding");
	};
	const navigateToInterestsPick = () => {
		setCurrentStep(2);
		navigation.navigate("InterestPick");
	};
	const navigateToNotificationsPick = () => {
		setCurrentStep(3);
		navigation.navigate("NotificationPick");
	};

	return (
		<OnboardingContext.Provider
			value={{
				currentStep,
				setCurrentStep,
				selectedInterests,
				addInterest,
				removeInterest,
				onSkip,
				navigateToIntro,
				navigateToInterestsPick,
				navigateToNotificationsPick
			}}
		>
			{children}
		</OnboardingContext.Provider>
	);
};

export { OnboardingContext, OnboardingProvider };
