export default abstract class {

	protected	parentElement: HTMLElement;

	constructor() {
		this.parentElement = document.body;
	}

	public render() {
		this.parentElement.className = "flex flex-col justify-between min-h-screen";
		this.parentElement.innerHTML = this.generateMarkup();
	}

	protected abstract	generateMarkup(): string;

	public renderErrorPage(errorCode: number) {
		let	markup = "";
		switch (errorCode) {
			case 401:
				markup = this.generateUnauthorizedMarkup();
				break;
			case 404:
				markup = this.generateNotFoundMarkup();
				break;
			case 503:
				markup = this.generateServiceUnavailableMarkup();
				break;
			default:
				break;
		}
		this.parentElement.className = "flex flex-col justify-between min-h-screen";
		this.parentElement.innerHTML = markup;
	}

	private generateNotFoundMarkup() {
		return `
			<h1>404 not found<h1>
		`;
	}

	private generateUnauthorizedMarkup() {
		return `
			<h1>401 Unauthorized<h1>
		`;
	}

	private generateServiceUnavailableMarkup() {
		return `
			<h1>503 Service Unavailable<h1>
		`;
	}

	protected handleModal() {
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