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
				<form class="min-h-96 bg-white sm:rounded-lg p-4 sm:p-8 w-full flex flex-col" novalidate>
					${this.generateMarkup()}
				</form>
			</main>
			${this.generateFooterMarkup()}
		`
	}

	protected generateFooterMarkup() : string {
		return `
			<footer class="text-sm sm:text-base">
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
			<label for="${inputId}" class="absolute font-medium max-w-42 truncate left-2 sm:left-2.5 -top-3 px-1 bg-white z-10">${labelText + (isRequired ? '*' : '')}</label>
		`;
		return labelElement;
	}

	protected inputGroupCheckValidity(inputGroup: Element): boolean {
		const validationOptions = [
			{
				attribute: "required",
				isValid: (input: HTMLInputElement): boolean => {
					if (input.type === "checkbox")
						return input.checked;
					return input.value.trim().length > 0;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string =>
					`${labelText} is required`
			},
			{
				attribute: "minlength",
				isValid: (input: HTMLInputElement): boolean =>
					input.value.trim().length >= input.minLength,
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string =>
					`${labelText} must contain at least ${input.minLength} characters`
			},
			{
				attribute: "custommaxlength",
				isValid: (input: HTMLInputElement): boolean =>
					input.value.trim().length < Number(input.getAttribute("custommaxlength")),
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string =>
					`${labelText} must contain at most ${input.getAttribute("custommaxlength")} characters`
			},
			{
				attribute: "pattern",
				isValid: (input: HTMLInputElement): boolean => {
					const patternRegex = new RegExp(input.pattern);
					return patternRegex.test(input.value);
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "min",
				isValid: (input: HTMLInputElement): boolean => {
					const inputDate = new Date(input.value);
					const minDate = new Date(input.min);
					return inputDate >= minDate;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "max",
				isValid: (input: HTMLInputElement): boolean => {
					const inputDate = new Date(input.value);
					const maxDate = new Date(input.max);
					return inputDate <= maxDate;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "match",
				isValid: (input: HTMLInputElement): boolean => {
					const elements = document.querySelectorAll(input.getAttribute("match"));
					for (const element of elements) {
						if(element instanceof HTMLLIElement && element.innerText === input.value)
							return true;
						if(element instanceof HTMLInputElement && element.value === input.value)
							return true;
					}
					return false;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "lowercase",
				isValid: (input: HTMLInputElement): boolean => {
					const amount = Number(input.getAttribute("lowercase"));
					return input.value.match(/[a-z]/g)?.length >= amount;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string => {
					const amount = Number(input.getAttribute("lowercase"));
					return `${labelText} must contain at least ${amount} lowercase letter${amount > 1 ? 's' : ''}`;
				}
			},
			{
				attribute: "uppercase",
				isValid: (input: HTMLInputElement): boolean => {
					const amount = Number(input.getAttribute("uppercase"));
					return input.value.match(/[A-Z]/g)?.length >= amount;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string => {
					const amount = Number(input.getAttribute("uppercase"));
					return `${labelText} must contain at least ${amount} uppercase letter${amount > 1 ? 's' : ''}`;
				}
			},
			{
				attribute: "digit",
				isValid: (input: HTMLInputElement): boolean => {
					const amount = Number(input.getAttribute("digit"));
					return input.value.match(/[0-9]/g)?.length >= amount;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string => {
					const amount = Number(input.getAttribute("lowercase"));
					return `${labelText} must contain at least ${amount} digit${amount > 1 ? 's' : ''}`;
				}
			},
			{
				attribute: "special",
				isValid: (input: HTMLInputElement): boolean => {
					const amount = Number(input.getAttribute("special").split(" ")[0]);
					const params = input.getAttribute("special").split(" ")[1];
					let count = 0;
					for(const char of input.value)
						if(params.includes(char))
							count++;
					return count >= amount;
				},
				generateErrorMessage: (input: HTMLInputElement, labelText: string): string => {
					const amount = Number(input.getAttribute("special").split(" ")[0]);
					const params = input.getAttribute("special").split(" ")[1];
					return `${labelText} must contain at least ${amount} special character${amount > 1 ? 's' : ''} ${params}`;
				}
			}
		];
	
		const	label = inputGroup.querySelector("label");
		const	labelText = label.innerText.slice(-1) === "*" ? label.innerText.slice(0, -1) : label.innerText;
		const	input = inputGroup.querySelector("input");
		const	errorSection = inputGroup.querySelector("section");

		for(const option of validationOptions) {
		 	if(input.hasAttribute(option.attribute) && !option.isValid(input)) {
		 		errorSection.innerText = option.generateErrorMessage(input, labelText);
		 		input.classList.add("!border-rose-400", "!ring-rose-200");
				return false;
		 	}
		}
		errorSection.textContent = "";
		input.classList.remove("!border-rose-400", "!ring-rose-200");
		return true;
	}

	protected formCheckValidity(form: HTMLFormElement): boolean {
		let isValid = true;
		const inputGroups = form.querySelectorAll("[data-input-group]");

		inputGroups.forEach(inputGroup => {
			if(!this.inputGroupCheckValidity(inputGroup))
				isValid = false;
		});
		return isValid;
	}

	public override render(user?: user, markupIndex?: number, worksites?: Map<number, string>) : void {
		super.render();
		this.parentElement.classList.add("bg-wf-primary", "py-6", "sm:py-10",  "sm:px-6",  "lg:px-8");
	}
}