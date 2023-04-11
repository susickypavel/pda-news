import "dotenv/config";

export default {
	expo: {
		name: "pda-news",
		slug: "pda-news",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff"
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff"
			}
		},
		scheme: "myapp",
		extra: {
			SUPABASE_URL: process.env.SUPABASE_URL,
			SUPABASE_PUBLIC_ANON: process.env.SUPABASE_PUBLIC_ANON
		}
	}
};
