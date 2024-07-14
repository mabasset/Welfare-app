import Model from "./Model";

export default class extends Model {

	public state : {
		user: user
	}

	constructor() {
		super();
	}

	public async userSignup(): Promise<void> {
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
}