import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Header, HeaderProps, useTheme } from "@rneui/themed";
import React, { PropsWithChildren, useMemo } from "react";
import { StyleSheet } from "react-native";

import { BackButton } from "./back-button";

type SubScreenHeaderProps = PropsWithChildren<NativeStackHeaderProps> & {
	/**
	 * @default {}
	 */
	headerProps?: Omit<HeaderProps, "leftComponent">;
};

export const SubScreenHeader: React.FC<SubScreenHeaderProps> = ({ back, headerProps = {}, route }) => {
	const { theme } = useTheme();
	const styles = StyleSheet.create({
		centerContainer: {
			flex: 1
		},
		leftContainer: {
			flex: 0
		}
	});

	const headerStyles = useMemo(() => {
		if (route.name === "InterestSubpage") {
			return {
				// @ts-ignore
				backgroundColor: theme.colors.categories[route.params.category].bg
			};
		}

		return {
			backgroundColor: undefined
		};
	}, [route, theme]);

	return (
		<Header
			leftContainerStyle={styles.leftContainer}
			centerContainerStyle={styles.centerContainer}
			leftComponent={<BackButton title={back?.title} />}
			containerStyle={headerStyles}
			{...headerProps}
		/>
	);
};

SubScreenHeader.displayName = "SubScreenHeader";
