import { createTheme } from "@rneui/themed";

export const theme = createTheme({
	darkColors: {
		background: "#000000"
	},
	lightColors: {
		background: "#ffffff"
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
		Badge: {
			badgeStyle: {
				height: "auto",
				borderRadius: 999
			},
			textStyle: {
				fontSize: 12,
				fontFamily: "InterTightMedium",
				textTransform: "capitalize",
				paddingHorizontal: 12,
				paddingVertical: 4,
			}
		}
	}
});
