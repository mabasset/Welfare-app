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
}