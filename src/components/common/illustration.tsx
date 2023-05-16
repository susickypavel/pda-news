import { Text } from "@rneui/themed";
import React from "react";
import { PropsWithChildren } from "react";
import { Image, type ImageSourcePropType, StyleSheet, View } from "react-native";

interface IllustrationTemplateProps {
	title: string;
	image: ImageSourcePropType;
}

export const IllustrationTemplate: React.FC<PropsWithChildren<IllustrationTemplateProps>> = ({
	children,
	image,
	title
}) => {
	return (
		<View style={styles.illustrationContainer}>
			<Image style={styles.illustration} source={image} />
			<View style={styles.illustrationContent}>
				<Text style={styles.illustrationTitle}>{title}</Text>
				{children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	illustration: {
		aspectRatio: 1,
		width: 160
	},
	illustrationContainer: {
		alignItems: "center",
		display: "flex",
		flexBasis: "auto",
		flexDirection: "row",
		padding: 8
	},
	illustrationContent: {
		flexShrink: 1,
		gap: 4,
		marginLeft: 16
	},
	illustrationTitle: {
		fontFamily: "InterTightBold",
		fontSize: 20
	}
});

IllustrationTemplate.displayName = "IllustrationTemplate";
