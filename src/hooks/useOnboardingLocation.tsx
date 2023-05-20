import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

import { useOnboarding } from "@/context/onboarding";

export function useOnboardingLocation() {
	const { previousStep } = useOnboarding();
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			return navigation.addListener("beforeRemove", () => {
				previousStep();
			});
		}, [navigation, previousStep])
	);
}
