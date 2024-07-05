import Model from "./Model"

export default class extends Model {

	private serviceRoot = "/user";

	constructor() {
		super();
	}

	public async checkSession(): Promise<boolean> {
		const url: string = this.getFullUrl(`${this.serviceRoot}/isActive`);
		const response : Response = await this.sendRequest(url);
		if (!response.ok)
			return false;
		const data = await response.json();
		return data.is_authenticated;
	}
}