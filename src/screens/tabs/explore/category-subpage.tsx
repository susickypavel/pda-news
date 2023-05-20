import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Icon, Text, useTheme } from "@rneui/themed";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { Alert, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/app";

import { supabase } from "@/api/supabase";
import { CategoryFeed } from "@/components/category-feed";
import { useAuthSafe } from "@/context/auth";

type CategorySubpageScreenRouteProp = RouteProp<RootStackParamList, "CategorySubpage">;

type CategorySubpageScreenNavigationProp = NavigationProp<RootStackParamList, "CategorySubpage">;

type CategorySubpageScreenProps = {
	route: CategorySubpageScreenRouteProp;
	navigation: CategorySubpageScreenNavigationProp;
};

export const CategorySubpageScreen: React.FC<CategorySubpageScreenProps> = ({ route: { params }, navigation }) => {
	const { theme } = useTheme();
	const { user } = useAuthSafe();
	const isFollowing = user.user_metadata.interests.includes(params.category);

	useEffect(() => {
		const onFollowPress = async () => {
			const { error } = await supabase.auth.updateUser({
				data: {
					...user.user_metadata,
					interests: isFollowing
						? user.user_metadata.interests.filter((interest: string) => interest !== params.category)
						: [...user.user_metadata.interests, params.category]
				}
			});

			if (error) {
				Alert.alert("Couldn't toggle follow", error.message);
			}
		};

		navigation.setOptions({
			headerTitle: params.category.charAt(0).toUpperCase() + params.category.slice(1),
			headerStyle: {
				backgroundColor: theme.colors.categories[params.category].bg
			},
			headerRight: () => (
				<TouchableOpacity onPress={onFollowPress}>
					<View
						style={{
							flexDirection: "row",
							gap: theme.spacing.sm,
							alignItems: "center"
						}}
					>
						<Icon size={20} name={isFollowing ? "check-circle" : "add-circle"} color="#000" />
						<Text style={{ color: "black", fontFamily: "InterTightBold" }}>
							{isFollowing ? "Following" : "Follow"}
						</Text>
					</View>
				</TouchableOpacity>
			)
		});
	}, [navigation, params.category, theme, isFollowing, user.user_metadata]);

	return (
		<SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
			<StatusBar barStyle="dark-content" />
			<CategoryFeed category={params.category} />
		</SafeAreaView>
	);
};

CategorySubpageScreen.displayName = "CategorySubpageScreen";
