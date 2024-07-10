export default abstract class {

	protected parentElement: HTMLElement;
	protected markup: string;

	constructor() {
		this.parentElement = document.body;
	}

	protected generateUnauthorizedMarkup() : string {
		return `
			<h1>401 Unauthorized<401>
		`;
	}

	public render() : void {
		this.parentElement.innerHTML = this.markup;
	}
}