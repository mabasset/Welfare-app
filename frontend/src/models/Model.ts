import { ip, port } from "../config"

export default class {

	protected baseUrl = `https://${ip}:${port}/api/`;
	
	constructor() {

	}
	
	private getCookie(name: string): string {
		let cookieValue = "";
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	protected async sendRequest(url: string, method: string = "GET", body: string = ""): Promise<Response> {
		const headers: HeadersInit = method === "POST" ? {
			"X-CSRFToken": this.getCookie("csrftoken")
		} : {};
		const options: RequestInit = {
			method,
			headers,
		};
		if (method !== "GET" && method !== "HEAD")
			options.body = body;
		return await fetch(url, options);
	}

	public async getUserData(): Promise<user> {
		const url: string = `${this.baseUrl}user/get_data`;
		const response = await this.sendRequest(url);
		const json = await response.json();
		let { is_authenticated: isLogged, name, surname, birthday, is_married: isMarried, childrens, elderly_parents: elderlyParents }
			: { is_authenticated: boolean; name: string; surname: string, birthday: string, is_married: string, childrens: string, elderly_parents: string } = json;
		if (isLogged)
			this.clearSessionStorage();
		else {
			name = this.getFromSessionStorage("name");
			surname = this.getFromSessionStorage("surname");
			birthday = this.getFromSessionStorage("birthday");
			isMarried = this.getFromSessionStorage("isMarried");
			childrens = this.getFromSessionStorage("childrens");
			elderlyParents = this.getFromSessionStorage("elderlyParents");
		}
		return { isLogged, name, surname, birthday, isMarried, childrens, elderlyParents };
	}

	public setToSessionStorage(key: string, value: string): void {
		sessionStorage.setItem(key, value);
	}

	public getFromSessionStorage(key: string): string | null {
		return sessionStorage.getItem(key);
	}

	public removeFromSessionStorage(key: string): void {
		sessionStorage.removeItem(key);
	}

	public clearSessionStorage(): void {
		sessionStorage.clear();
	}
}