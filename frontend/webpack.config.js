const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
	entry: path.resolve(__dirname, './src/ts/index.ts'),
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					configFile: path.resolve(__dirname, './tsconfig.json'),
				},
				include: path.resolve(__dirname, './src'),
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, './src'),
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			HOST: JSON.stringify(process.env.HOST),
			PORT: JSON.stringify(process.env.FRONTEND_PORT),
			LOCATION_BACKEND: JSON.stringify(process.env.LOCATION_BACKEND),
			API: {
				user: {
					location: JSON.stringify(process.env.LOCATION_USER_APP),
					endpoints: {
						getData: JSON.stringify(process.env.ENDPOINT_USER_GET_DATA),
						getWorksites: JSON.stringify(process.env.ENDPOINT_USER_GET_WORKSITES),
						signup: JSON.stringify(process.env.ENDPOINT_USER_SIGNUP),
						login: JSON.stringify(process.env.ENDPOINT_USER_LOGIN),
						forgotPassword: JSON.stringify(process.env.ENDPOINT_USER_FORGOT_PASSWORD),
					}
				},
			},
			ROUTE_RESET_PASSWORD: JSON.stringify(process.env.ROUTE_RESET_PASSWORD),
			// Password validators
			PASSWORD_MIN_LENGTH: JSON.stringify(process.env.PASSWORD_MIN_LENGTH),
			PASSWORD_MAX_LENGTH: JSON.stringify(process.env.PASSWORD_MAX_LENGTH),
			PASSWORD_MIN_AMOUNT_LOWER: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_LOWER),
			PASSWORD_MIN_AMOUNT_UPPER: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_UPPER),
			PASSWORD_MIN_AMOUNT_DIGIT: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_DIGIT),
			PASSWORD_MIN_AMOUNT_SPECIAL: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_SPECIAL),
			PASSWORD_SPECIAL_CHARACTERS: JSON.stringify(process.env.PASSWORD_SPECIAL_CHARACTERS),
			// Email validators
			EMAIL_MAX_LENGTH: JSON.stringify(process.env.EMAIL_MAX_LENGTH),
			EMAIL_PATTERN: JSON.stringify(process.env.EMAIL_PATTERN),
			// Name fields validators
			NAME_MIN_LENGTH: JSON.stringify(process.env.NAME_MIN_LENGTH),
			NAME_MAX_LENGTH: JSON.stringify(process.env.NAME_MAX_LENGTH),
			NAME_PATTERN: JSON.stringify(process.env.NAME_PATTERN),
			// Surname fields validators
			SURNAME_MIN_LENGTH: JSON.stringify(process.env.SURNAME_MIN_LENGTH),
			SURNAME_MAX_LENGTH: JSON.stringify(process.env.SURNAME_MAX_LENGTH),
			SURNAME_PATTERN: JSON.stringify(process.env.SURNAME_PATTERN),
			// Birthday fields validators
			BIRTHDAY_MIN_OFFSET: JSON.stringify(process.env.BIRTHDAY_MIN_OFFSET),
			BIRTHDAY_MAX_OFFSET: JSON.stringify(process.env.BIRTHDAY_MAX_OFFSET),
			// Street address fields validators
			STREET_MAX_LENGTH: JSON.stringify(process.env.STREET_MAX_LENGTH),
			STREET_PATTERN: JSON.stringify(process.env.STREET_PATTERN),
			// Postal code fields validators
			POSTAL_CODE_MAX_LENGTH: JSON.stringify(process.env.POSTAL_CODE_MAX_LENGTH),
			// City code fields validators
			CITY_MAX_LENGTH: JSON.stringify(process.env.CITY_MAX_LENGTH),
			CITY_PATTERN: JSON.stringify(process.env.CITY_PATTERN),
			// Country code fields validators
			COUNTRY_MAX_LENGTH: JSON.stringify(process.env.COUNTRY_MAX_LENGTH),
			COUNTRY_PATTERN: JSON.stringify(process.env.COUNTRY_PATTERN),
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './static'),
	},
	mode: 'development',
	watchOptions: {
		poll: 1000,
	},
	devtool: 'source-map',
};