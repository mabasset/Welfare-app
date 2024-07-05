import View from "./View";

export default class extends View {
	constructor () {
		const parentElement = document.querySelector("main");
		super(parentElement);
	}

	protected override generateMarkup() : string {
		return `
			<h1>404 not found<h1>
		`;
	}
}