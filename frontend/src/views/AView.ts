export default abstract class {

	protected markup: string;

	constructor() {}

	public render() {
		const body = document.body;
		body.className = "d-flex flex-column min-vh-100";
		body.innerHTML = this.markup;
	}
}