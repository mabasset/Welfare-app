import View from "./View";

export default class extends View {
	constructor () {
		const parentElement = document.querySelector("body");
		super(parentElement);
		this.markup = this.generateMarkup();
	}

	protected generateMarkup() : string {
		return `
			<h1>404 not found<h1>
		`;
	}
}