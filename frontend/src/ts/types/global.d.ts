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
			forgotPassword: string,
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

declare const ROUTE_RESET_PASSWORD: string;

declare const EMAIL_MAX_LENGTH: string;
declare const EMAIL_PATTERN: string;

declare const NAME_MIN_LENGTH: string;
declare const NAME_MAX_LENGTH: string;
declare const NAME_PATTERN: string;

declare const SURNAME_MIN_LENGTH: string;
declare const SURNAME_MAX_LENGTH: string;
declare const SURNAME_PATTERN: string;

declare const BIRTHDAY_MIN_OFFSET: string;
declare const BIRTHDAY_MAX_OFFSET: string;

declare const STREET_MAX_LENGTH: string;
declare const STREET_PATTERN: string;

declare const POSTAL_CODE_MAX_LENGTH: string;

declare const CITY_MAX_LENGTH: string;
declare const CITY_PATTERN: string;

declare const COUNTRY_MAX_LENGTH: string;
declare const COUNTRY_PATTERN: string;

type User = {
	[key: string]: string | boolean | number;
}

type RenderingFunction = (user: User, urlParams: Record<string, string>) => Promise<void>;