import { CustomError } from "../helpers";
import AView from "./AView";

export default class extends AView {

	private error = new CustomError(503);

	constructor() {
		super();
	}

	render(error: CustomError) {
		this.error = error;
		super.render();
	}

	protected override generateMarkup() {
		return `
			${this.generateDefaultHeaderMarkup()}
			<main>
				<h1>${this.error.code} ${this.error.text}<h1>
			</main>
			${this.generateDefaultFooterMarkup()}
		`;
	};
}