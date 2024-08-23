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
			<main class="flex flex-auto items-center justify-center text-center flex-col sm:flex-row text-white">
				<h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight sm:pr-6 sm:mr-6 sm:border-r sm:border-white">
					${this.error.code}
				</h1>
				<h2 class="mt-2 text-lg sm:mt-0">
					${this.error.text}
				</h2>
			</main>
			${this.generateDefaultFooterMarkup()}
		`;
	};
}