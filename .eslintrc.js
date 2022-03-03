module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es2021: true,
		"vue/setup-compiler-macros": true
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended"
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"]
	}
};
