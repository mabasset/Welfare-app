export default abstract class {

	protected parentElement: HTMLElement;
	protected markup: string;

	constructor() {
		this.parentElement = document.body;
	}

	public render() {
		this.parentElement.className = "d-flex flex-column justify-content-between min-vh-100";
		this.parentElement.innerHTML = this.markup;
	}

	protected generateNotFoundMarkup() : string {
		return `
			<h1>404 not found<h1>
		`;
	}

	protected generateUnauthorizedMarkup() : string {
		return `
			<h1>401 Unauthorized<h1>
		`;
	}

	public renderErrorMarkup(errorCode: number): void {
		switch (errorCode) {
			case 401:
				this.markup = this.generateUnauthorizedMarkup();
				break;
			case 404:
				this.markup = this.generateNotFoundMarkup();
				break;
			default:
				break;
		}
		this.parentElement.innerHTML = this.markup;
	}
}