import { useNavigation } from "@react-navigation/native";
import { Badge, Image, Text, useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export type ArticlePreviewProps = any;

// export interface ArticlePreviewProps {
// 	id: string;
// 	title: string;
// 	content: string | null;
// 	source_id: { name: string };
// 	category: BadgeCategory;
// }

export const ArticlePreview: React.FC<ArticlePreviewProps> = props => {
	const { navigate } = useNavigation();
	const { theme } = useTheme();

	const {
		title,
		content,
		source_id: { name },
		category
	} = props;

	const onPress = () => {
		navigate("ArticleDetail", props);
	};

	const isExternal = !content;

	// const { bg: thumbnailBg, fg: thumbnailFg } = theme.colors.categories[category];

	const styles = StyleSheet.create({
		author: {
			alignItems: "center",
			flexDirection: "row",
			gap: 8
		},
		container: {
			gap: 12,
			width: "100%"
		},
		domain: {
			fontSize: 16
		},
		excerpt: {
			fontSize: 14
		},
		excerptContainer: {
			borderColor: theme.colors.brand,
			borderLeftWidth: 3,
			paddingHorizontal: 16
		},
		thumbnail: {
			aspectRatio: 16 / 9,
			flex: 1,
			width: "100%"
		},
		title: {
			fontFamily: "BitterSemiBold",
			fontSize: 26,
			lineHeight: 26 * 1.25
		}
	});

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Image
					containerStyle={styles.thumbnail}
					source={{
						uri: `https://dummyimage.com/600x400/000/fff`
					}}
				/>
				<View style={styles.author}>
					<Badge value={category} category={category} />
					<Text style={styles.domain}>{name}</Text>
				</View>
				<Text style={styles.title}>{title}</Text>
				{isExternal ? null : (
					<View style={styles.excerptContainer}>
						<Text style={styles.excerpt} numberOfLines={2}>
							{content}
						</Text>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

ArticlePreview.displayName = "ArticlePreview";
