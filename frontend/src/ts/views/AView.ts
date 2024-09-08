export default abstract class {
	protected bodyClassList = "flex flex-col justify-between min-h-svh";

	protected headerClassName = "sm:w-full sm:max-w-96 sm:mx-auto pt-6";
	protected mainClassName = "";
	protected footerClassName = "text-sm sm:text-base mb-6 sm:mb-10";
	abstract documentTitle: string;

	constructor() {}

	render(...args: any) {
		document.title = this.documentTitle + " | Welfare is on";
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
								<button class="p-1.5 rounded-md focus:outline outline-2 outline-offset-2" style="color: hsl(${hue}, 100%, 40%); outline-color: hsl(${hue}, 100%, 40%)" data-alert-closer>
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
			<header class="${this.headerClassName}">
				${this.generateHeaderMarkup()}
			</header>
			<main class="${this.mainClassName}">
				${this.generateMainMarkup()}
			</main>
			<footer class="${this.footerClassName}">
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
					<a href="https://www.leonardo.com/en/privacy-policy" target="_blank" class="text-white hover:text-black no-underline hover:underline select-none" data-open-window="privacy-policy">
						Privacy Policy
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a href="https://www.leonardo.com/en/cookie-policy" target="_blank" class="text-white hover:text-black no-underline hover:underline select-none" data-open-window="cookie-policy">
						Cookie Policy
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						Cookie Preferences
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a href="https://www.leonardo.com/en/legal-notice" target="_blank" class="text-white hover:text-black no-underline hover:underline select-none" data-open-window="legal-notice">
						Legal Notice
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a class="text-white hover:text-black no-underline hover:underline select-none">
						Sitemap
					</a>
				</li>
				<li class="py-0 px-2 border-l border-transparent">
					<a href="https://www.leonardo.com/en/cert" target="_blank" class="text-white hover:text-black no-underline hover:underline select-none" data-open-window="cert">
						CERT
					</a>
				</li>
			</ul>
		`
	}

	protected addEventHandlers() {
		(function modals() {
			(function openers() {
				const addClickHandler = (opener: HTMLElement) => {
					const handler = () =>
						(document.querySelector(`[data-modal=${opener.dataset.openModal}]`) as HTMLDialogElement)?.showModal();
					opener.addEventListener("click", handler);
				};
				(document.querySelectorAll(`[data-open-modal]`) as NodeListOf<HTMLElement>).forEach(addClickHandler);
			})();
			(function closers() {
				const addClickHandler = (closer: HTMLElement) => {
					const handler = () =>
						(closer.closest(`[data-modal]`) as HTMLDialogElement)?.close();
					closer.addEventListener("click", handler);
				};
				(document.querySelectorAll("[data-close-modal]") as NodeListOf<HTMLElement>).forEach(addClickHandler);
			})();
			(function outOfBoundClicks() {
				const addMouseDownkHandler = (modal: HTMLDialogElement) => {
					const handler = (event: MouseEvent) => {
						const modalDimensions = modal.getBoundingClientRect();
  						if (event.clientX < modalDimensions.left || event.clientX > modalDimensions.right || event.clientY < modalDimensions.top || event.clientY > modalDimensions.bottom)
  							modal.close();
					};
					modal.addEventListener("mousedown", handler);
				};
				(document.querySelectorAll("[data-modal]") as NodeListOf<HTMLDialogElement>).forEach(addMouseDownkHandler);
			})();
		})();
		(function dropdownTogglers() {
			const addClickHandler = (toggler: HTMLElement) => {
				const handler = () =>
					(document.querySelector(`[data-dropdown=${toggler.dataset.toggleDropdown}]`) as HTMLDialogElement)?.toggleAttribute("open");
				toggler.addEventListener("click", handler);
			};
			(document.querySelectorAll("[data-toggle-dropdown]") as NodeListOf<HTMLElement>).forEach(addClickHandler);
		})();
		(function alerts() {
			const handleAlertCloserClick = (event: Event) => {
				(event.target as HTMLElement).closest("[data-alert-closer]")?.closest("[data-alert]")?.remove();
			}
			document.querySelector("[data-alert-container]")?.addEventListener("click", handleAlertCloserClick);
		})();
		(function popupWindowOpeners() {
			const addClickHandler = (opener: HTMLLinkElement) => {
				const handler = (event: Event) => {
					event.preventDefault();
					window.open(opener.href, opener.dataset.openWindow,'width=600,height=400,top=100,left=5');
				}
				opener.addEventListener("click", handler);
			}
			(document.querySelectorAll("[data-open-window]") as NodeListOf<HTMLLinkElement>).forEach(addClickHandler);
		})();
	}
}