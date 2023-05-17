import { SearchBar, useTheme } from "@rneui/themed";
import React, { PropsWithChildren, useState } from "react";
import { Modal, Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

import { SearchFeed } from "./search-feed";

type SearchModalProps = PropsWithChildren<{
	isVisible: boolean;
	onClose: () => void;
}>;

export const SearchModal: React.FC<SearchModalProps> = ({ isVisible, onClose }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 250);
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: "rgba(0, 0, 0, 0.9)",
			flex: 1,
			justifyContent: "flex-start"
		},
		loading: {
			color: theme.colors.primary
		}
	});

	return (
		<Modal statusBarTranslucent visible={isVisible} animationType="fade" transparent={true}>
			<SafeAreaProvider>
				<SafeAreaView edges={["top", "bottom"]} style={styles.container}>
					<SearchFeed searchTerm={debouncedSearchTerm} onRedirect={onClose}>
						{({ isFetching, isFetchingNextPage }) => (
							<SearchBar
								onChangeText={setSearchTerm}
								loadingProps={styles.loading}
								showLoading={isFetching && !isFetchingNextPage}
								value={searchTerm || ""}
								platform={Platform.OS === "ios" ? "ios" : "android"}
								placeholder="Search articles..."
								showCancel={true}
								onCancel={onClose}
								autoFocus
							/>
						)}
					</SearchFeed>
				</SafeAreaView>
			</SafeAreaProvider>
		</Modal>
	);
};

SearchModal.displayName = "SearchModal";
