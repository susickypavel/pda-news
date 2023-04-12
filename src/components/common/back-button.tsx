import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Text, useTheme } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

type BackButtonProps = PropsWithChildren<{
	title?: string;
}>;

export const BackButton: React.FC<BackButtonProps> = ({ title = "Back" }) => {
	const { theme } = useTheme();
	const { goBack } = useNavigation();

	const styles = StyleSheet.create({
		buttonStyle: {
			paddingHorizontal: 0,
			paddingRight: 8,
			paddingVertical: 16
		},
		title: {
			fontFamily: "InterTightSemiBold",
			fontSize: 16,
			marginLeft: 4
		}
	});

	return (
		<Button type="clear" buttonStyle={styles.buttonStyle} onPress={goBack}>
			<Icon color={theme.colors.black} name="chevron-left" />
			<Text style={styles.title}>{title}</Text>
		</Button>
	);
};

BackButton.displayName = "BackButton";
