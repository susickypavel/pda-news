import { Icon, Text, useTheme } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type AlertProps = PropsWithChildren<{
	title: string;
	message: string;
}>;

export const Alert: React.FC<AlertProps> = ({ title, message, children }) => {
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: theme.colors.errorBackground,
			borderRadius: 4,
			gap: theme.spacing.lg,
			padding: theme.spacing.lg
		},
		message: {
			fontFamily: "InterTightMedium",
			fontSize: 14,
			lineHeight: 21
		},
		title: {
			fontFamily: "InterTightBold",
			fontSize: 16
		},
		titleContainer: {
			alignItems: "center",
			flexDirection: "row",
			gap: theme.spacing.sm
		}
	});

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Icon name="error" color={theme.colors.black} />
				<Text style={styles.title}>{title}</Text>
			</View>
			<Text style={styles.message}>{message}</Text>
			{children}
		</View>
	);
};

Alert.displayName = "Alert";
