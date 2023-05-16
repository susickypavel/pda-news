module.exports = function (api) {
	api.cache(true);

	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						"@/components": "./src/components",
						"@/screens": "./src/screens",
						"@/api": "./src/api",
						"@/context": "./src/context",
						"@/assets": "./assets",
						"@/hooks": "./src/hooks",
						src: "./src",
						"@/types": "./src/types",
						"@/stores": "./src/stores",
						"@/queries": "./src/api/queries"
					}
				}
			],
			"react-native-reanimated/plugin"
		]
	};
};
