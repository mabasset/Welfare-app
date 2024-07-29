import AView from "../AView";

export default abstract class extends AView {

	constructor() {
		super();
	}

	protected generateHeaderMarkup() : string {
		return `
			<header class="sm:w-full sm:max-w-96 sm:mx-auto">
				<img src="/static/public/images/smile.svg" alt="smile" class="w-auto mx-auto h-20">
				<div class="text-center text-white">
					<a href="/" class="tracking-tight leading-9 font-bold text-2xl mt-6 hover:text-black" data-link>
						Welfare is on
					</a>
				</div>
			</header>
		`
	}

	protected generateLayoutMarkup() : string {
		return `
			${this.generateHeaderMarkup()}
			<main class="w-full max-w-screen-md mx-auto my-6 sm:my-10">
				${this.generateMarkup()}
			</main>
			${this.generateFooterMarkup()}
		`
	}

	protected generateFooterMarkup() : string {
		return `
			<footer class="text-sm sm:text-base">
				<ul class="flex flex-wrap justify-center border-0">
					<li class="py-0 px-2">
						<a href="#" class="text-white hover:text-black no-underline hover:underline">
						Privacy Policy
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a href="#" class="text-white hover:text-black no-underline hover:underline">
						Cookie Policy
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a href="#" class="text-white hover:text-black no-underline hover:underline">
						Preference Cookie
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a href="#" class="text-white hover:text-black no-underline hover:underline">
						Nota legale
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a href="#" class="text-white hover:text-black no-underline hover:underline">
						Sitemap
						</a>
					</li>
					<li class="py-0 px-2 border-l border-transparent">
						<a href="#" class="text-white hover:text-black no-underline hover:underline">
						CERT
						</a>
					</li>
				</ul>
			</footer>
		`
	}

	protected generateMarkup(): string {
		return`
		`
	}

	protected generateLabelFor(inputId: string, isRequired: boolean): string {
		let labelText = (inputId.charAt(0).toUpperCase() + inputId.slice(1)).replace(/-/g, ' ');
		const labelElement = `
			<label for="${inputId}" class="absolute font-medium max-w-32 truncate left-2 sm:left-2.5 -top-3 px-1 bg-white z-10">${labelText + (isRequired ? ' *' : '')}</label>
		`;
		return labelElement;
	}

	public override render(user?: user, markupIndex?: number, worksites?: Map<number, string>) : void {
		super.render();
		this.parentElement.classList.add("bg-wf-primary", "py-6", "sm:py-10",  "sm:px-6",  "lg:px-8");
	}
}