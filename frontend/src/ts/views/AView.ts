import { CustomError } from "../helpers";

export default abstract class {

	protected bodyClassList = "flex flex-col justify-between min-h-screen";

	protected headerClassList = "sm:w-full sm:max-w-96 sm:mx-auto";
	protected mainClassList = "";
	protected footerClassList = "text-sm sm:text-base mb-6 sm:mb-10";

	constructor() {}

	render(...args: any) {
		document.body.className = this.bodyClassList;
		document.body.classList.add("bg-wf-primary");
		document.body.innerHTML = this.generateMarkup();
		const alertContainer = document.createElement("div");
		alertContainer.setAttribute("id", "alert-container");
		document.body.insertAdjacentElement("afterbegin", alertContainer);
		this.addEventListeners();
	}

	protected generateMarkup() {
		return `
			<header class="${this.headerClassList}">
				${this.generateHeaderMarkup()}
			</header>
			<main class="${this.mainClassList}">
				${this.generateMainMarkup()}
			</main>
			<footer class="${this.footerClassList}">
				${this.generateFooterMarkup()}
			</footer>
		`;
	}

	protected generateHeaderMarkup() {
		return `
			<img src="/static/public/images/smile.svg" alt="smile" class="w-auto mx-auto h-20">
			<div class="text-center text-white">
				<a href="/" class="tracking-tight leading-9 font-bold text-2xl mt-6 hover:text-black" data-link>
					Welfare is on
				</a>
			</div>
		`;
	}

	protected generateMainMarkup() {
		return "";
	}

	protected	generateFooterMarkup() {
		return `
			<ul class="flex flex-wrap justify-center border-0">
				<li class="py-0 px-2">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						Privacy Policy
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						Cookie Policy
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						Preference Cookie
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						Legal Notes
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						Sitemap
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						CERT
					</a>
				</li>
			</ul>
		`
	}

	protected renderAlert(color: string, text: string) {
		const generateAlertMarkup = () => `
			<div class="max-w-4xl mx-auto" data-alert>
				<div class="p-4 rounded-md bg-${color}-100">
					<div class="flex">
						<div class="shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5 text-${color}-600">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="ml-3">
							<p class="text-${color}-900 font-medium text-sm m-0">${text}</p>
						</div>
						<div class="ml-auto pl-3">
							<div class="-m-1.5">
								<button class="text-${color}-600 p-1.5 hover:bg-red-200 rounded-md focus:outline outline-2 outline-red-600 outline-offset-2">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5">
										<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`
		document.getElementById("alert-container")!.insertAdjacentHTML("afterbegin", generateAlertMarkup());
	}

	protected addEventListeners() {

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

	public toggleButton(id: string) {
		const button = document.getElementById(id) as HTMLButtonElement;
		if (button)
			button.disabled = !button.disabled;
	}
}