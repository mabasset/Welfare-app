import Model from "./AModel";

export default class extends Model {

	private sessionCookiePrefix = "s_";
	private	endpoints = API.user.endpoints;

	constructor() {
		super();
		this.baseUrl += `${API.user.location}/`;
	}

	public async getUserData(): Promise<user> {
		const url: string = `${this.baseUrl + this.endpoints.getData}/`;
		const response = await this.sendRequest(url);
		if (!response.ok) {
			throw new Error("Something went wrong", {cause: new Error("Original cause of the error")});
		}
		const json = await response.json();
		const { is_authenticated: isLogged, name, surname, birthday, marital_status: maritalStatus, childrens, elderly_parents: elderlyParents } = json;
		return { isLogged, name, surname, birthday, maritalStatus, childrens, elderlyParents };
	}

	public async signup(formData: FormData): Promise<void> {
		console.log("signup");
		// const url: string = `${this.userAppUrl + endpointSignup}`;
		// const response = await this.sendRequest(url, "POST", formData);
		// const json = await response.json();
		// console.log(json)
		// const user : user = { isLogged: json.is_authenticated };
	}

	public async login(formData: FormData): Promise<void> {
		console.log("login");
		// const url: string = `${this.userAppUrl + endpointLogin}`;
		//const response = await this.sendRequest(url);
		//const json = await response.json();
		//const user : user = { isLogged: json.is_authenticated };
	}

	public async retrievePassword(formData: FormData): Promise<void> {
		console.log("retrieve password");
		// const url: string = `${this.userAppUrl + endpointRetrievePassword}`;
	}

	public async getWorksiteOptions(): Promise<Map<number, string>> {
		const url: string = `${this.baseUrl + this.endpoints.getWorksites}/`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		const worksitesMap = new Map<number, string>();
		for (let key in json)
			if (json.hasOwnProperty(key))
				worksitesMap.set(parseInt(key), json[key]);
		return worksitesMap;
	}

	public getUserDataFromCookies(): user {
		let user: user = {};

		const cookies = document.cookie.split(";");
		cookies.forEach(cookie => {
			cookie = cookie.trim();
			if (cookie.startsWith(this.sessionCookiePrefix)) {
				const [key, value] = cookie.split('=');
				user[key.slice(this.sessionCookiePrefix.length)] = value;
			}
		});
		return user;
	}

	public getSignupViewSectionMarkupIndex(): number {
		let markupIndexCookie = Number(this.getFromSessionStorage("signupViewSection"));
		if (!markupIndexCookie || markupIndexCookie < 0 || markupIndexCookie > 3)
			markupIndexCookie = 0;
		return markupIndexCookie;
	}

	public modifySignupViewSectionMarkupIndex(offset: number) {
		const markupIndex = this.getSignupViewSectionMarkupIndex() + offset;
		this.setToSessionStorage("signupViewSection", String(markupIndex));
	}

	public saveFormDataAsSessionCookies(formData: FormData) {
		for (const [key, value] of formData.entries())
			this.setCookie(key, String(value), this.sessionCookiePrefix);
	}

	private clearSessionCookies(user: user) {
		for (const key in user)
			this.deleteCookie(key);
	}
}