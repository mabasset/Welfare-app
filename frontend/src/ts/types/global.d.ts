declare const HOST: string;
declare const PORT: string;
declare const LOCATION_BACKEND: string;
declare const API: {
	user: {
		location: string,
		endpoints: {
			getData: string,
			getWorksites: string,
			signup: string,
			login: string,
			retrievePassword: string,
		}
	},
}
declare const PASSWORD_MIN_LENGTH: string;
declare const PASSWORD_MAX_LENGTH: string;
declare const PASSWORD_MIN_AMOUNT_LOWER: string;
declare const PASSWORD_MIN_AMOUNT_UPPER: string;
declare const PASSWORD_MIN_AMOUNT_DIGIT: string;
declare const PASSWORD_MIN_AMOUNT_SPECIAL: string;
declare const PASSWORD_SPECIAL_CHARACTERS: string;
