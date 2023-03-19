module.exports = function (api) {
	api.cache(true);

	return {
		presets: ["babel-preset-expo"],
		plugins: [
			require.resolve("expo-router/babel"),
			[
				"module-resolver",
				{
					alias: {
						"@/components": "./src/components",
						"@/screens": "./src/screens",
						"@/api": "./src/api",
						"@/context": "./src/context"
					}
				}
			]
		]
	};
};
