import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Header } from "@rneui/themed";
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

import { BackButton } from "./back-button";

type SubScreenHeaderProps = PropsWithChildren<NativeStackHeaderProps>;

export const SubScreenHeader: React.FC<SubScreenHeaderProps> = ({ back }) => {
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
		/>
	);
};

SubScreenHeader.displayName = "SubScreenHeader";
