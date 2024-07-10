import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {
	
	constructor() {
		super();
		this.markup = this.generateLayoutMarkup();
	}

	protected override generateMarkup(): string {
		return `
		`
	}
}