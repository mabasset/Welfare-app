import AView from "../AView";

export default abstract class extends AView {

	protected	inputClasslist = "truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring";
	protected	mainElement: HTMLElement | undefined;

	constructor() {
		super();
	}

	protected abstract renderMainMarkup(): void;

	override render(...args: any) {
		super.render();
		this.mainElement = document.querySelector("main") as HTMLElement;
		this.renderMainMarkup();
		this.addEventListeners();
	}

	protected override generateMarkup() {
		return `
			${this.generateDefaultHeaderMarkup()}
			<main></main>
			${this.generateDefaultFooterMarkup()}
		`;
	}

	protected addEventListeners() {
		["input", "focusout"].forEach(eventType =>
			this.mainElement?.addEventListener(eventType, event =>
				this.handleInputEvents(event.target as HTMLInputElement))
		);
		this.mainElement?.addEventListener("click", event =>
			this.handlePasswordTogglerClick(event.target as HTMLButtonElement)
		);
	}

	private	handleInputEvents(input: HTMLInputElement) {
		const inputGroup = input.closest("[data-input-group]");
		if (!inputGroup)
			return;
		this.inputGroupCheckValidity(inputGroup);
	}

	private	handlePasswordTogglerClick(button: HTMLButtonElement) {
		const inputId = button.dataset.passwordToggler;
		if (!inputId)
			return ;
		const input = document.getElementById(inputId) as HTMLInputElement;
		input.type = input.type === "password" ? "text" : "password";
		button.querySelector(".bi-eye")?.classList.toggle("hidden");
		button.querySelector(".bi-eye-slash")?.classList.toggle("hidden");
	}

	public addFormSubmitionHandler(handler: Function) {
		this.mainElement?.addEventListener("submit", event => {
			event.preventDefault();
			const form = event.target as HTMLFormElement;
			if (this.formCheckValidity(form))
				handler(new FormData(form));
		});
	}

	protected	generatePasswordTogglerMarkup(inputId: string) {
		return `
			<button type="button" tabindex="-1" class="absolute right-0 top-0 h-10 me-3 flex items-center" data-password-toggler="${inputId}">
				<svg xmlns="http://www.w3.org/2000/svg" height="22" fill="currentColor" class="hidden bi bi-eye" viewBox="0 0 16 16">
					<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
					<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" height="22" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
					<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
					<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
					<path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
				</svg>
			</button>
		`;
	}

	protected	generateLabelFor(inputId: string, isRequired: boolean): string {
		let labelText = (inputId.charAt(0).toUpperCase() + inputId.slice(1)).replace(/-/g, ' ');
		const labelElement = `
			<label for="${inputId}" class="${isRequired ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""} absolute font-medium max-w-42 truncate left-2 sm:left-2.5 -top-3 px-1 bg-white z-10">${labelText}</label>
		`;
		return labelElement;
	}

	protected	inputGroupCheckValidity(inputGroup: Element): boolean {
		const	label = inputGroup.querySelector("label");
		const	input = inputGroup.querySelector("input") as HTMLInputElement;
		const	errorSection = inputGroup.querySelector("section");
		const	labelText = label ? label.innerText.slice(-1) === "*" ?
			label.innerText.slice(0, -1) : label.innerText : "This field"
		const	validationOptions = [
			{
				attribute: "required",
				isValid: (): boolean => {
					if (input.type === "checkbox")
						return input.checked;
					return input.value.trim().length > 0;
				},
				generateErrorMessage: (): string =>
					`${labelText} is required`
			},
			{
				attribute: "minlength",
				isValid: (): boolean =>
					input.value.trim().length >= input.minLength,
				generateErrorMessage: (): string =>
					`${labelText} must contain at least ${input.minLength} characters`
			},
			{
				attribute: "custommaxlength",
				isValid: (): boolean =>
					input.value.trim().length < Number(input.getAttribute("custommaxlength")),
				generateErrorMessage: (): string =>
					`${labelText} must contain at most ${input.getAttribute("custommaxlength")} characters`
			},
			{
				attribute: "pattern",
				isValid: (): boolean => {
					const patternRegex = new RegExp(input.pattern);
					return patternRegex.test(input.value);
				},
				generateErrorMessage: (): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "min",
				isValid: (): boolean => {
					const inputDate = new Date(input.value);
					const minDate = new Date(input.min);
					return inputDate >= minDate;
				},
				generateErrorMessage: (): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "max",
				isValid: (): boolean => {
					const inputDate = new Date(input.value);
					const maxDate = new Date(input.max);
					return inputDate <= maxDate;
				},
				generateErrorMessage: (): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "match",
				isValid: (): boolean => {
					const match = input.getAttribute("match");
					if (!match)
						return true;
					const elements = document.querySelectorAll(match);
					for (const element of elements) {
						if(element instanceof HTMLLIElement && element.innerText === input.value)
							return true;
						if(element instanceof HTMLInputElement && element.value === input.value)
							return true;
					}
					return false;
				},
				generateErrorMessage: (): string =>
					`${labelText} is invalid`
			},
			{
				attribute: "lowercase",
				isValid: (): boolean => {
					const amount = Number(input.getAttribute("lowercase"));
					const match = input.value.match(/[a-z]/g);
					if (!match)
						return false;
					return match.length >= amount;
				},
				generateErrorMessage: (): string => {
					const amount = Number(input.getAttribute("lowercase"));
					return `${labelText} must contain at least ${amount} lowercase letter${amount > 1 ? 's' : ''}`;
				}
			},
			{
				attribute: "uppercase",
				isValid: (): boolean => {
					const amount = Number(input.getAttribute("uppercase"));
					const match = input.value.match(/[A-Z]/g);
					if (!match)
						return false;
					return match.length >= amount;
				},
				generateErrorMessage: (): string => {
					const amount = Number(input.getAttribute("uppercase"));
					return `${labelText} must contain at least ${amount} uppercase letter${amount > 1 ? 's' : ''}`;
				}
			},
			{
				attribute: "digit",
				isValid: (): boolean => {
					const amount = Number(input.getAttribute("digit"));
					const match = input.value.match(/[0-9]/g);
					if (!match)
						return false;
					return match.length >= amount;
				},
				generateErrorMessage: (): string => {
					const amount = Number(input.getAttribute("lowercase"));
					return `${labelText} must contain at least ${amount} digit${amount > 1 ? 's' : ''}`;
				}
			},
			{
				attribute: "special",
				isValid: (): boolean => {
					const special = input.getAttribute("special");
					if (!special)
						return true;
					const amount = Number(special.split(" ")[0]);
					const params = special.split(" ")[1];
					let count = 0;
					for(const char of input.value)
						if(params.includes(char))
							count++;
					return count >= amount;
				},
				generateErrorMessage: (): string => {
					const special = input.getAttribute("special");
					if (!special)
						return "";
					const amount = Number(special.split(" ")[0]);
					const params = special.split(" ")[1];
					return `${labelText} must contain at least ${amount} special character${amount > 1 ? 's' : ''} ${params}`;
				}
			}
		];

		for(const option of validationOptions) {
		 	if(input.hasAttribute(option.attribute) && !option.isValid()) {
		 		errorSection!.innerHTML = `
					<div class="p-1 flex items-center text-rose-600 text-xs font-medium">
						<span class="me-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-exclamation-triangle size-4" viewBox="0 0 16 16">
								<path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
								<path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
							</svg>
						</span>
						<span>
							${option.generateErrorMessage()}
						</span>
					<div>
				`
		 		input.classList.add("!border-rose-400", "!ring-rose-200");
				return false;
		 	}
		}
		errorSection!.innerHTML = "";
		input.classList.remove("!border-rose-400", "!ring-rose-200");
		return true;
	}

	protected	formCheckValidity(form: HTMLFormElement): boolean {
		let isValid = true;
		const inputGroups = form.querySelectorAll("[data-input-group]");

		inputGroups.forEach(inputGroup => {
			if(!this.inputGroupCheckValidity(inputGroup))
				isValid = false;
		});
		return isValid;
	}
}