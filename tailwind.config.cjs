/** @type {import('tailwindcss').Config} */
module.exports = {
	daisyui: {
		themes: [
			"light",
			{
				"dark": {
					...require("daisyui/src/colors/themes")["[data-theme=dark]"],
					"neutral-content": "#d5d8de",
					"base-content": "#d5d8de",
				}
			}
		],
	},
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
