export default abstract class {

	protected markup: string;

	constructor() {}

	public render() {
		const body = document.body;
		body.className = "d-flex flex-column justify-content-between min-vh-100";
		body.innerHTML = this.markup;
	}
}