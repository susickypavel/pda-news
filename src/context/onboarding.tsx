/* eslint-disable @typescript-eslint/no-empty-function */
import { useNavigation } from "@react-navigation/native";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import type { SupportedRegion } from "src/constants";

import { supabase } from "@/api/supabase";
import type { RootStackScreens } from "@/types/app";

export const ONBOARDING_STEPS = [
	"OnboardingIntro",
	"OnboardingRegion",
	"OnboardingInterest"
] satisfies RootStackScreens[];

type OnboardingProviderProps = {
	children: ReactNode;
};

type OnboardingContext = {
	currentStep: number;
	homeRegion: SupportedRegion;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	selectedInterests: string[];
	addInterest: (interest: string) => void;
	removeInterest: (interest: string) => void;
	onSkip: () => void;
	goto: (step: number) => void;
	nextStep: () => void;
	previousStep: () => void;
	setHomeRegion: (region: SupportedRegion) => void;
};

const OnboardingContext = createContext<OnboardingContext>({
	currentStep: 0,
	homeRegion: "cz",
	setCurrentStep: () => {},
	selectedInterests: [],
	addInterest: () => {},
	removeInterest: () => {},
	onSkip: () => {},
	goto: () => {},
	nextStep: () => {},
	previousStep: () => {},
	setHomeRegion: () => {}
});

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
	const navigation = useNavigation();

	const [currentStep, setCurrentStep] = useState<number>(0);
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [homeRegion, setHomeRegion] = useState<SupportedRegion>("de");

	const updateUser = async () => {
		const { error } = await supabase.auth.updateUser({
			data: {
				onboarding_finished: true,
				interests: selectedInterests,
				home_region: homeRegion
			}
		});

		if (error) {
			Alert.alert("Couldn't finish onboarding", error.message);
		}
	};

	const addInterest = (interest: string) => {
		setSelectedInterests(prevInterests => [...prevInterests, interest]);
	};

	const removeInterest = (interest: string) => {
		setSelectedInterests(prevInterests => prevInterests.filter(item => item !== interest));
	};

	const onSkip = async () => await updateUser();

	const goto: OnboardingContext["goto"] = async step => {
		if (step < 0 || step >= ONBOARDING_STEPS.length) {
			await updateUser();
			return;
		}

		setCurrentStep(step);
	};

	const nextStep = () => goto(currentStep + 1);
	const previousStep = () => goto(currentStep - 1);

	useEffect(() => {
		const nextPage = ONBOARDING_STEPS[currentStep];

		if (!nextPage) {
			return;
		}

		navigation.navigate(nextPage);
	}, [currentStep]);

	return (
		<OnboardingContext.Provider
			value={{
				homeRegion,
				currentStep,
				setCurrentStep,
				selectedInterests,
				addInterest,
				removeInterest,
				onSkip,
				nextStep,
				previousStep,
				goto,
				setHomeRegion
			}}
		>
			{children}
		</OnboardingContext.Provider>
	);
};

OnboardingProvider.displayName = "OnboardingProvider";

export function useOnboarding() {
	return useContext(OnboardingContext);
}
