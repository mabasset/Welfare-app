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
		alertContainer.setAttribute("data-alert-container", "");
		alertContainer.className = "absolute top-0 sm:px-6 lg:px-8";
		document.body.insertAdjacentElement("afterbegin", alertContainer);
		this.addEventHandlers();
	}

	renderAlert(hue: number, text: string) {
		document.querySelector("[data-alert-container]")!.insertAdjacentHTML("afterbegin", `
			<div class="max-w-4xl mx-auto" data-alert>
				<div class="p-4 rounded-md" style="background-color: hsl(${hue}, 100%, 90%)">
					<div class="flex items-center">
						<div class="shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5" style="color: hsl(${hue}, 100%, 40%)">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<div class="ml-3">
							<p class="font-medium text-sm m-0" style="color: hsl(${hue}, 100%, 20%)">${text}</p>
						</div>
						<div class="ml-auto pl-3">
							<div class="-m-1.5">
								<button class="p-1.5 rounded-md focus:outline outline-2 outline-offset-2" data-alert-dismiss style="color: hsl(${hue}, 100%, 40%); outline-color: hsl(${hue}, 100%, 40%)">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="size-5">
										<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`);
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
			<ul class="flex flex-wrap justify-center border-0 pb-8">
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

	protected addEventHandlers() {
		const addModalEventHandlers = () => {
			const handleModalEnablerClick = (enabler: HTMLElement) =>
				(document.querySelector(`[data-modal=${enabler.dataset.openModal}]`) as HTMLDialogElement)?.showModal();
			const handleModalDisablerClick = (disabler: HTMLElement) =>
				(disabler.closest(`[data-modal]`) as HTMLDialogElement)?.close();
			const handleModalOutOfBoundClick = (modal: HTMLDialogElement, event: PointerEvent) => {
				const modalDimensions = modal.getBoundingClientRect();
  				if (event.clientX < modalDimensions.left || event.clientX > modalDimensions.right || event.clientY < modalDimensions.top || event.clientY > modalDimensions.bottom)
  					modal.close();
			};

			document.querySelectorAll(`[data-open-modal]`).forEach(enabler => 
				enabler.addEventListener("click", () =>
					handleModalEnablerClick(enabler as HTMLElement)));
			document.querySelectorAll("[data-close-modal]").forEach(disabler =>
				disabler.addEventListener("click", () =>
					handleModalDisablerClick(disabler as HTMLElement)));
			document.querySelectorAll("[data-modal]").forEach(modal => 
				modal.addEventListener("mousedown", event =>
					handleModalOutOfBoundClick(modal as HTMLDialogElement, event as PointerEvent)));
		};
		const addDropDownEventHandlers = () => {
			const handleDropDownTogglerClick = (toggler: HTMLElement) =>
				(document.querySelector(`[data-dropdown=${toggler.dataset.toggleDropdown}]`) as HTMLDialogElement)?.toggleAttribute("open");

			document.querySelectorAll("[data-toggle-dropdown]").forEach(toggler =>
				toggler.addEventListener("click", () =>
					handleDropDownTogglerClick(toggler as HTMLElement)));
		};
		const addAlertEventHandlers = () => {
			const handleAlerDismisserClick = (event: Event) =>
				(event.target as HTMLElement).closest("[data-alert-dismiss]")?.closest("[data-alert]")?.remove();

			document.querySelector("[data-alert-container]")?.addEventListener("click", handleAlerDismisserClick);
		};

		addModalEventHandlers();
		addDropDownEventHandlers();
		addAlertEventHandlers();
	}

	public toggleButton(id: string) {
		const button = document.getElementById(id) as HTMLButtonElement;
		if (button)
			button.disabled = !button.disabled;
	}
}