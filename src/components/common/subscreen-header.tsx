import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Header, HeaderProps, useTheme } from "@rneui/themed";
import React, { createElement, PropsWithChildren, useMemo } from "react";
import { StyleSheet } from "react-native";

import { BackButton } from "./back-button";

type SubScreenHeaderProps = PropsWithChildren<NativeStackHeaderProps> & {
	/**
	 * @default {}
	 */
	headerProps?: Omit<HeaderProps, "leftComponent" | "rightComponent"> & {
		rightComponent: any;
	};
};

export const SubScreenHeader: React.FC<SubScreenHeaderProps> = ({ back, headerProps: _headerProps = {}, route }) => {
	const { rightComponent, ...headerProps } = _headerProps;

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
			backgroundColor: theme.colors.white
		};
	}, [route, theme]);

	return (
		<Header
			leftContainerStyle={styles.leftContainer}
			centerContainerStyle={styles.centerContainer}
			leftComponent={<BackButton title={back?.title} />}
			containerStyle={headerStyles}
			rightComponent={rightComponent ? createElement(rightComponent, { route }) : undefined}
			{...headerProps}
		/>
	);
};

SubScreenHeader.displayName = "SubScreenHeader";
