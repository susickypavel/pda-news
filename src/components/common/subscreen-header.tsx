import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Header, HeaderProps } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

import { BackButton } from "./back-button";

type SubScreenHeaderProps = PropsWithChildren<NativeStackHeaderProps> & {
	/**
	 * @default {}
	 */
	headerProps?: Omit<HeaderProps, "leftComponent">;
};

export const SubScreenHeader: React.FC<SubScreenHeaderProps> = ({ back, headerProps = {} }) => {
	const styles = StyleSheet.create({
		centerContainer: {
			flex: 1
		},
		leftContainer: {
			flex: 0
		}
	});

	return (
		<Header
			leftContainerStyle={styles.leftContainer}
			centerContainerStyle={styles.centerContainer}
			leftComponent={<BackButton title={back?.title} />}
			{...headerProps}
		/>
	);
};

SubScreenHeader.displayName = "SubScreenHeader";
