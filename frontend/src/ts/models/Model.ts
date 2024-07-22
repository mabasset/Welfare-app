import { ip, port } from "../config"

export default class {

	protected baseUrl = `https://${ip}:${port}/api/`;
	
	constructor() {

	}
	
	public setCookie(key: string, value: string): void {
		document.cookie = `${key}=${value}`;
	}

	protected getCookie(key: string): string | null {
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.substring(0, key.length + 1) === key + "=")
					return decodeURIComponent(cookie.substring(key.length + 1));
			}
		}
		return null;
	}

	private deleteCookie(key: string): void {
		document.cookie = `${key}=;Max-Age=0`;
	}

	private clearSessionCookies(user: user) {
		for (const key in user) {
			console.log(key)
			this.deleteCookie(key);
		}
		console.log(document.cookie)
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
		const { is_authenticated: isLogged, name, surname, birthday, is_married: isMarried, childrens, elderly_parents: elderlyParents } = json;
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