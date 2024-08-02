import Model from "./Model";

export default class extends Model {

	public state : {
		user: user
	}

	constructor() {
		super();
	}

	public async userSignup(formData: FormData): Promise<void> {
		const url: string = `${this.baseUrl}user/signup`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		const user : user = { isLogged: json.is_authenticated };
	}

	public async userLogin(): Promise<void> {
		const url: string = `${this.baseUrl}user/login`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		const user : user = { isLogged: json.is_authenticated };
	}

	public getUserDataFromCookies(prefix: string): user {
		let user: user = {};

		const cookies = document.cookie.split(";");
		cookies.forEach(cookie => {
			cookie = cookie.trim();
			if (cookie.startsWith(prefix)) {
				const [key, value] = cookie.split('=');
				user[key.slice(prefix.length)] = value;
			}
		});
		return user;
	}

	public getSignupMarkupIndex(): number {
		let markupIndexCookie = Number(this.getFromSessionStorage("signupViewSection"));
		if (!markupIndexCookie || markupIndexCookie > 3)
			markupIndexCookie = 0;
		return markupIndexCookie;
	}

	public async getWorksites(): Promise<Map<number, string>> {
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