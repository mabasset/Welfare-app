/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./static/public/index.html',
		'./static/bundle.js',
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
		},
	},
	plugins: [
		require('tailwindcss-textshadow')
	],
}