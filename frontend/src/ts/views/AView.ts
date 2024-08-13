export default abstract class {

	protected parentElement: HTMLElement;
	protected markup = "";

	constructor() {
		this.parentElement = document.body;
	}

	public render() {
		this.parentElement.className = "flex flex-col justify-between min-h-screen";
		this.parentElement.innerHTML = this.markup;
	}

	public renderAlert() {
		
	}

	public renderErrorMarkup(errorCode: number): void {
		switch (errorCode) {
			case 401:
				this.markup = this.generateUnauthorizedMarkup();
				break;
			case 404:
				this.markup = this.generateNotFoundMarkup();
				break;
			default:
				break;
		}
		this.render();
	}

	protected generateNotFoundMarkup() : string {
		return `
			<h1>404 not found<h1>
		`;
	}

	protected generateUnauthorizedMarkup() : string {
		return `
			<h1>401 Unauthorized<h1>
		`;
	}

	protected handleModal(): void {
		const openBtn = document.querySelector("[data-open-modal]");
		const closeBtn = document.querySelector("[data-close-modal]");
		const modal = document.querySelector("[data-modal]") as HTMLDialogElement;

		openBtn?.addEventListener("click", () => modal.showModal());
		closeBtn?.addEventListener("click", () => modal.close());
		modal?.addEventListener("mousedown", event => {
			const modalDimensions = modal.getBoundingClientRect()
			if (
				event.clientX < modalDimensions.left ||
				event.clientX > modalDimensions.right ||
				event.clientY < modalDimensions.top ||
				event.clientY > modalDimensions.bottom
			) {
				modal.close()
			}
		})
	}
}