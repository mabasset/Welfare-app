export const ip : string = "localhost";
export const port : number = 443;

export const endpointGetData: string = process.env.ENDPOINT_USER_GET_DATA;
export const endpointGetWorksites: string = process.env.ENDPOINT_USER_GET_WORKSITES;
export const endpointSignup: string = process.env.ENDPOINT_USER_SIGNUP;
export const endpointLogin: string = process.env.ENDPOINT_USER_LOGIN;
export const endpointRetrievePassword: string = process.env.ENDPOINT_USER_RETRIEVE_PASSWORD;

export const passwordMinLength: string = process.env.PASSWORD_MIN_LENGTH;
export const passwordMaxLength: string = process.env.PASSWORD_MAX_LENGTH;
export const passwordMinAmountLower: string = process.env.PASSWORD_MIN_AMOUNT_LOWER;
export const passwordMinAmountUpper: string = process.env.PASSWORD_MIN_AMOUNT_UPPER;
export const passwordMinAmountDigit: string = process.env.PASSWORD_MIN_AMOUNT_DIGIT;
export const passwordMinAmountSpecial: string = process.env.PASSWORD_MIN_AMOUNT_SPECIAL;
export const passwordSpecialCharacters: string = process.env.PASSWORD_SPECIAL_CHARACTERS;