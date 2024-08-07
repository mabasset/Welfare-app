import Model from "./Model";

export default class extends Model {

	private userAppUrl = this.baseApiUrl + 'user/';
	private sessionCookiePrefix = "s_";

	public state : {
		user: user
	}

	constructor() {
		super();
	}

	public async userSignup(formData: FormData): Promise<void> {
		const url: string = `${this.userAppUrl}signup/`;
		const response = await this.sendRequest(url, "POST", formData);
		const json = await response.json();
		console.log(json)
		const user : user = { isLogged: json.is_authenticated };
	}

	public async userLogin(): Promise<void> {
		const url: string = `${this.userAppUrl}login/`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		const user : user = { isLogged: json.is_authenticated };
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
		const url: string = `${this.userAppUrl}get_worksites`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		const worksitesMap = new Map<number, string>();
		for (let key in json)
			if (json.hasOwnProperty(key))
				worksitesMap.set(parseInt(key), json[key]);
		return worksitesMap;
	}
}