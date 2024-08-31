module.exports = {
	content: [
		'./src/**/*.{html,js,jsx,ts,tsx}',
		'./static/**/*.{html,js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			height: {
				'100': '25rem',
				'104': '26rem',
				'108': '27rem',
				'112': '28rem',
				'116': '29rem',
				'120': '30rem',
			},
			screens: {
				'xs': '576px',
			},
		},
	},
	plugins: [
		require('tailwindcss-textshadow'),
	],
}