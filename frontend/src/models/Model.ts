import { ip, port } from "../config"

export default class{

	private baseUrl = `https://${ip}:${port}`;
	
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

	private async sendRequest(url: string, method: string = "GET", body: string = ""): Promise<Response> {
		const headers: HeadersInit = method === "POST" ? {
			"X-CSRFToken": this.getCookie("csrftoken")
		} : {};
		const options: RequestInit = {
			method,
			headers,
			body,
		};
		return await fetch(url, options);
	}

	public async getUserData(username: string): Promise<user> {
		const url: string = `${this.baseUrl}/user/getData/${username}`;
		const response : Response = await this.sendRequest(url);
		const data = await response.json();
		return data.is_authenticated;
	}
}