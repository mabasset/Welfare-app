export default abstract class {

	constructor (
		private parentElement : HTMLElement,
	) { }

	protected generateNotAllowedMarkup() : string {
		return `
			<h1>401 not allowed<401>
		`;
	}

	protected abstract generateMarkup() : string

	public render() : void {
		const markup = this.generateMarkup();
		this.parentElement.innerHTML =  markup;
	}
}