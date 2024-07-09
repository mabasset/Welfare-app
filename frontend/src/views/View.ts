export default abstract class {

	protected markup : string;

	constructor (
		protected parentElement : HTMLElement,
	) { }

	protected generateNotAllowedMarkup() : string {
		return `
			<h1>401 not allowed<401>
		`;
	}

	public render() : void {
		this.parentElement.innerHTML = this.markup;
	}
}