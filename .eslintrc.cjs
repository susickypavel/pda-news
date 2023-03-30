/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
		"react-native/react-native": true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-native/all",
		"plugin:react-hooks/recommended"
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ["react", "react-native", "@typescript-eslint", "simple-import-sort"],
	rules: {
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		"react/prop-types": "off",
		"react-native/no-inline-styles": "off",
		"react-native/no-color-literals": "warn",
		"@typescript-eslint/ban-ts-comment": "warn"
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};
