import { Button, Icon, Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import {
	getCurrentPositionAsync,
	getLastKnownPositionAsync,
	requestForegroundPermissionsAsync,
	reverseGeocodeAsync
} from "expo-location";
import React, { PropsWithChildren } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { SUPPORTED_REGIONS } from "src/constants";
import { REGION_FULLNAME } from "src/constants";

import { ArticleFeed, FetchingIndicator } from "./article-feed";
import { Alert } from "./common/alert";

type GPSBasedNewsProps = PropsWithChildren<{
	currentDate: Date;
}>;

const LAST_POSITON_MAX_AGE = 1000 * 60 * 5;

class RegionError extends Error {
	constructor(region: string) {
		super(`Unfortunately, we're not in '${region}' region, yet.`);
	}
}

class GrantError extends Error {
	constructor() {
		super("Permission not granted, open settings and allow location access.");
	}
}

function isSupportedRegion(region: string): region is (typeof SUPPORTED_REGIONS)[number] {
	return SUPPORTED_REGIONS.includes(region as any);
}

export const GPSBasedNews: React.FC<GPSBasedNewsProps> = ({ currentDate }) => {
	const { data, isError, isLoading, refetch, error } = useQuery({
		queryKey: ["location"],
		staleTime: LAST_POSITON_MAX_AGE,
		retry: false,
		queryFn: async () => {
			const { granted } = await requestForegroundPermissionsAsync();

			if (!granted) {
				throw new GrantError();
			}

			let location = await getLastKnownPositionAsync({
				maxAge: LAST_POSITON_MAX_AGE
			});

			if (!location) {
				location = await getCurrentPositionAsync();
			}

			const geocoding = await reverseGeocodeAsync({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});

			const countryCode = geocoding[0]?.isoCountryCode?.toLowerCase() || "";

			if (!isSupportedRegion(countryCode)) {
				throw new RegionError(countryCode);
			}

			return countryCode;
		}
	});

	if (isLoading) {
		return <FetchingIndicator />;
	}

	if (isError) {
		let content: JSX.Element = (
			<Button
				title="Retry"
				onPress={() => refetch()}
				icon={<Icon name="restart" type="material-community" />}
				iconPosition="right"
				buttonStyle={styles.retryButton}
			/>
		);

		if (error instanceof GrantError) {
			content = (
				<React.Fragment>
					<Button
						title="Retry"
						onPress={() => refetch()}
						icon={<Icon name="restart" type="material-community" />}
						iconPosition="right"
						buttonStyle={styles.retryButton}
					/>
					<Button
						title="Open settings"
						onPress={Linking.openSettings}
						icon={<Icon name="settings" />}
						iconPosition="right"
						buttonStyle={styles.retryButton}
					/>
				</React.Fragment>
			);
		}

		return (
			<Alert title="Couldn't get local news" message={error instanceof Error ? error.message : String(error)}>
				{content}
			</Alert>
		);
	}

	return (
		<ArticleFeed
			currentDate={currentDate}
			region={data}
			headerComponent={
				<View style={styles.successAlert}>
					<Text style={styles.text}>Feed is from {REGION_FULLNAME[data]}!</Text>
				</View>
			}
		/>
	);
};

const styles = StyleSheet.create({
	retryButton: {
		justifyContent: "space-between"
	},
	successAlert: {
		backgroundColor: "green",
		marginBottom: 16,
		padding: 16
	},
	text: {
		color: "#fff",
		fontFamily: "InterTightBold",
		textAlign: "center"
	}
});

GPSBasedNews.displayName = "GPSBasedNews";
