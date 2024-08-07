import Model from "./Model";

export default class extends Model {
	private sessionCookiePrefix = "s_";

	public state : {
		user: user
	}

	constructor() {
		super();
	}

	public async signup(formData: FormData): Promise<void> {
		console.log("signup");
		//const url: string = `${this.baseUrl}user/signup`;
		//const response = await this.sendRequest(url);
		//const json = await response.json();
		//const user : user = { isLogged: json.is_authenticated };
	}

	public async login(formData: FormData): Promise<void> {
		console.log("login");
		//const url: string = `${this.baseUrl}user/login`;
		//const response = await this.sendRequest(url);
		//const json = await response.json();
		//const user : user = { isLogged: json.is_authenticated };
	}

	public async retrievePassword(formData: FormData): Promise<void> {
		console.log("retrieve password");
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
	
	public async getWorksiteOptions(): Promise<Map<number, string>> {
		const url: string = `${this.baseUrl}user/get_worksites`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		const worksitesMap = new Map<number, string>();
		for (let key in json)
			if (json.hasOwnProperty(key))
				worksitesMap.set(parseInt(key), json[key]);
		return worksitesMap;
	}
}