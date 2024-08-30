import Model from "./AModel";

export default class extends Model {

	private	endpoints = API.user.endpoints;

	constructor() {
		super();
		this.baseUrl += `${API.user.location}/`;
	}

	public async getData() {
		const url: string = `${this.baseUrl + this.endpoints.getData}/`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		return json;
	}

	public async signup(formData: FormData) {
		const url: string = `${this.baseUrl + this.endpoints.signup}/`;
		const data = Object.fromEntries(formData);
		await this.sendRequest(url, "POST", JSON.stringify(data));
	}

	public async login(formData: FormData) {
		const url: string = `${this.baseUrl + this.endpoints.login}/`;
		const data = Object.fromEntries(formData);
		await this.sendRequest(url, "POST", JSON.stringify(data));
	}

	public async retrievePassword(formData: FormData) {
		console.log("retrieve password");
		const url: string = `${this.baseUrl + this.endpoints.forgotPassword}/`;
		const data = Object.fromEntries(formData);
		await this.sendRequest(url, "POST", JSON.stringify(data));
	}

	public async getWorksites() {
		const url: string = `${this.baseUrl + this.endpoints.getWorksites}/`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		const worksites = new Map<number, string>();
		for (const key in json)
			if (json.hasOwnProperty(key))
				worksites.set(parseInt(key), json[key]);
		return worksites;
	}

	public	getDataFromSessionStrorage() {
		let	user = new Map<string, string>();
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key !== null) {
				const value = this.getFromSessionStorage(key);
				if (value !== null)
					user.set(key, value);
			}
		}
		return user;
	}

	public	setDataToSessionStrorage(user: Map<string, string>) {
		for(const [key, value] of user) {
			this.setToSessionStorage(key, value);
		}
	}
}