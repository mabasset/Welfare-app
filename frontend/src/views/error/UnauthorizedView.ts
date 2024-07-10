import AView from "../AView";

export default class extends AView {
	constructor () {
		super();
		this.markup = this.generateMarkup();
	}

	protected generateMarkup() : string {
		return `
			<h1>401 Unauthorized<401>
		`;
	}
}