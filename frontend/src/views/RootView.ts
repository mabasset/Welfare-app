import View from "./View";

export default class extends View {
	constructor (
		private data: user
	) {
		const parentElement = document.querySelector("main");
		super(parentElement);
	}

	protected override generateMarkup() : string {
		return `

		`;
	}
}