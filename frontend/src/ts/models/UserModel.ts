import Model from "./AModel";

export default class extends Model {

	private	endpoints = API.user.endpoints;

	constructor() {
		super();
		this.baseUrl += `${API.user.location}/`;
	}

	public async getUserData(): Promise<user> {
		const url: string = `${this.baseUrl + this.endpoints.getData}/`;
		const response = await this.sendRequest(url);
		if (!response.ok)
			throw new Error(undefined, {cause: response});
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
		for (const key in json)
			if (json.hasOwnProperty(key))
				worksitesMap.set(parseInt(key), json[key]);
		return worksitesMap;
	}

	public	getUserDataFromSessionStrorage(): user {
		let	user: user = {};
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key !== null) {
				const value = this.getFromSessionStorage(key);
				if (value !== null)
					user[key] = value;
			}
		}
		return user;
	}
}