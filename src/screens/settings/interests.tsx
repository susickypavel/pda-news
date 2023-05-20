import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ListItem, useTheme } from "@rneui/themed";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES } from "src/constants";
import { RootStackParamList } from "src/types/app";

import { supabase } from "@/api/supabase";
import { useAuthSafe } from "@/context/auth";
import type { BadgeCategory } from "@/types/theme";

type InterestsSettingsScreenRouteProp = RouteProp<RootStackParamList, "InterestsSettings">;

type InterestsSettingsScreenNavigationProp = NavigationProp<RootStackParamList, "InterestsSettings">;

type InterestsSettingsScreenProps = {
	route: InterestsSettingsScreenRouteProp;
	navigation: InterestsSettingsScreenNavigationProp;
};

export const InterestsSettingsScreen: React.FC<InterestsSettingsScreenProps> = () => {
	const { user } = useAuthSafe();
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			padding: theme.spacing.sm
		},
		title: {
			fontFamily: "InterTightSemiBold",
			textTransform: "capitalize"
		}
	});

	const onPress = async (interest: BadgeCategory, isFollowing: boolean) => {
		const { error } = await supabase.auth.updateUser({
			data: {
				...user.user_metadata,
				interests: isFollowing
					? user.user_metadata.interests.filter((currentInterest: string) => interest !== currentInterest)
					: [...user.user_metadata.interests, interest]
			}
		});

		if (error) {
			Alert.alert("Couldn't toggle follow", error.message);
		}
	};

	return (
		<SafeAreaView edges={["bottom"]} style={styles.container}>
			{CATEGORIES.map(interest => {
				const isFollowing = user.user_metadata.interests.includes(interest);

				return (
					<TouchableOpacity key={interest} onPress={() => onPress(interest, isFollowing)}>
						<ListItem>
							<ListItem.Content>
								<ListItem.Title style={styles.title}>{interest}</ListItem.Title>
							</ListItem.Content>
							<ListItem.CheckBox
								iconType="material-community"
								checkedIcon="checkbox-marked"
								uncheckedIcon="checkbox-blank-outline"
								checked={isFollowing}
								disabled={true}
							/>
						</ListItem>
					</TouchableOpacity>
				);
			})}
		</SafeAreaView>
	);
};

InterestsSettingsScreen.displayName = "InterestsSettingsScreen";
