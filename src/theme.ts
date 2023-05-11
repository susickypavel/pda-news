import { Colors, createTheme } from "@rneui/themed";

const categories: Colors["categories"] = {
	business: { bg: "#7DA1F6", fg: "#000" },
	entertainment: { bg: "#dc2626", fg: "#000" },
	environment: { bg: "#00C474", fg: "#000" },
	food: { bg: "#ea580c", fg: "#000" },
	health: { bg: "#F08957", fg: "#000" },
	politics: { bg: "#9D9CDE", fg: "#000" },
	science: { bg: "#B68353", fg: "#000" },
	sports: { bg: "#F2B040", fg: "#000" },
	technology: { bg: "#F0E360", fg: "#000" }
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
					borderBottomWidth: 0
				},
				style: {
					marginBottom: 0,
					marginEnd: 0,
					marginVertical: 0
				},
				statusBarProps: {
					barStyle: theme.mode === "dark" ? "light-content" : "dark-content"
				}
			};
		},
		Badge(props, theme) {
			return {
				badgeStyle: {
					height: "auto",
					borderRadius: 999,
					backgroundColor: props.category ? theme.colors.categories[props.category].bg : undefined,
					borderWidth: 0
				},
				textStyle: {
					fontSize: 12,
					fontFamily: "InterTightMedium",
					textTransform: "capitalize",
					paddingHorizontal: 12,
					paddingVertical: 4,
					color: props.category ? theme.colors.categories[props.category].fg : undefined
				}
			};
		}
	}
});
