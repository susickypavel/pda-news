import { createTheme } from "@rneui/themed";

const categories = {
	business: "#000080",
	entertainment: "#dc2626",
	environment: "#84cc16",
	food: "#ea580c",
	health: "#15803d",
	politics: "#000",
	science: "#fff",
	sports: "#eab308",
	technology: "#2563eb"
} as const;

export const theme = createTheme({
	darkColors: {
		background: "#000000",
		brand: "#9333ea",
		categories
	},
	lightColors: {
		background: "#ffffff",
		brand: "#9333ea",
		categories
	},
	components: {
		Button: {
			containerStyle: {
				width: "100%"
			},
			buttonStyle: {
				paddingVertical: 16
			},
			titleStyle: {
				fontFamily: "InterTightBlack",
				fontWeight: "900"
			}
		},
		Input: {
			containerStyle: {
				paddingHorizontal: 0
			}
		},
		Icon: {
			color: "#fff"
		},
		Text: {
			style: {
				fontFamily: "InterTightRegular"
			}
		},
		Header(_, theme) {
			return {
				backgroundColor: theme.colors.background,
				containerStyle: {
					borderBottomWidth: 0,
				},
				style: {
					marginBottom: 0,
					marginEnd: 0,
					marginVertical: 0,
				},
				statusBarProps: {
					barStyle: theme.mode === "dark" ? "light-content" : "dark-content",
				}
			};
		},
		Badge(props, theme) {
			const backgroundColor =
				// @ts-ignore
				props.badgeStyle?.backgroundColor || theme.colors.categories[props.value] || theme.colors.grey1;

			return {
				badgeStyle: {
					height: "auto",
					borderRadius: 999,
					backgroundColor,
					borderWidth: 0
				},
				textStyle: {
					fontSize: 12,
					fontFamily: "InterTightMedium",
					textTransform: "capitalize",
					paddingHorizontal: 12,
					paddingVertical: 4
				}
			};
		}
	}
});
