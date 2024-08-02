import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {

	private user: user;
	private markupIndex: number;
	private markupGeneratorFunctions = new Array<Function>;
	private worksites: Map<number, string>;
	
	constructor() {
		super();
		this.markupGeneratorFunctions.push(this.generateFirstMarkup.bind(this));
		this.markupGeneratorFunctions.push(this.generateSecondMarkup.bind(this));
		this.markupGeneratorFunctions.push(this.generateThirdMarkup.bind(this));
		this.markupGeneratorFunctions.push(this.generateFinalMarkup.bind(this));
	}

	protected override generateMarkup(): string {
		const functionToCall = this.markupGeneratorFunctions[this.markupIndex];
		const markup = functionToCall();
		return markup;
	}

	private generateFirstMarkup(): string {
		const html = `
			<div class="flex-grow flex items-center pt-2 sm:pt-4 text-sm">
				<div class="grid grid-rows-5 sm:grid-rows-3 grid-cols-6 gap-2 sm:gap-5 w-full">
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("name", true)}
						<input id="name" name="name" value="${this.user.name || ''}" type="text" pattern="^[A-Za-zÀ-ÖØ-öø-ÿ ']+$" minlength="2" custommaxlength="50" required autocomplete="on"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("surname", true)}
						<input id="surname" name="surname" value="${this.user.surname || ''}" type="text" pattern="^[A-Za-zÀ-ÖØ-öø-ÿ ']+$" minlength="2" custommaxlength="50" required
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("birthday", true)}
						<input id="birthday" name="birthday" value="${this.user.birthday || ''}" type="date" min="${this.getOffsetDate(100)}" max="${this.getOffsetDate(15)}" required
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-3 relative">
						${this.generateLabelFor("interest", false)}
						<select id="interest" name="interest" class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
							<option class="hidden"></option>
							<option value="0" ${this.user.interest === "0" ? 'selected' : ''}>Sport</option>
							<option value="1" ${this.user.interest === "1" ? 'selected' : ''}>Reading</option>
							<option value="2" ${this.user.interest === "2" ? 'selected' : ''}>Relax</option>
							<option value="3" ${this.user.interest === "3" ? 'selected' : ''}>Prevention</option>
							<option value="4" ${this.user.interest === "4" ? 'selected' : ''}>Other...</option>
						</select>
					</div>
					<div class="col-span-3 sm:col-span-2 relative">
						${this.generateLabelFor("marital-status", false)}
						<select id="marital-status" name="maritalStatus" class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
							<option class="hidden"></option>
							<option value="Single" ${this.user.maritalStatus === "Single" ? 'selected' : ''}>Single</option>
							<option value="Married" ${this.user.maritalStatus === "Married" ? 'selected' : ''}>Married</option>
						</select>
					</div>
					<div class="col-span-3 sm:col-span-2 relative">
						${this.generateLabelFor("childrens", false)}
						<select id="childrens" name="childrens" class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
							<option class="hidden"></option>
							<option value="0" ${this.user.childrens === "0" ? 'selected' : ''}>No</option>
							<option value="1" ${this.user.childrens === "1" ? 'selected' : ''}>Yes</option>
						</select>
					</div>
					<div class="col-span-3 sm:col-span-2 relative">
						${this.generateLabelFor("elderly-parents", false)}
						<select id="elderly-parents" name="elderlyParents" class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
							<option class="hidden"></option>
							<option value="0" ${this.user.elderlyParents === "0" ? 'selected' : ''}>No</option>
							<option value="1" ${this.user.elderlyParents === "1" ? 'selected' : ''}>Yes</option>
						</select>
					</div>
				</div>
			</div>
			${this.generateProfilingFooterMarkup()}
		`;
		return html;
	}

	private generateSecondMarkup(): string {
		const html = `
			<div class="flex-grow flex items-center pt-2 sm:pt-4">
				<div class="grid grid-rows-4 sm:grid-rows-3 grid-cols-6 gap-2 sm:gap-5 w-full">
					<div class="col-span-6 relative" data-input-group>
						${this.generateLabelFor("worksite", true)}
						<input id="worksite" value="${this.user.worksite ? this.worksites.get(Number(this.user.worksite)) : ''}" type="search" autocomplete="off" required
							match="[data-worksite-option]"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
						<ul id="worksite-dropdown-body" class="hidden ps-2 pe-3 pb-2 mt-px absolute bg-white w-full rounded bg-clip-padding text-left text-base shadow-lg z-20 max-h-36 overflow-y-auto overflow-x-hidden">
							${this.generateWorksitesListMarkup()}
						</ul>
						<input id="hidden-worksite" name="worksite" value="${this.user.worksite || ''}" type="hidden">
					</div>
					<div class="col-span-6 sm:col-span-4 relative" data-input-group>
						${this.generateLabelFor("street", true)}
						<input id="street" name="street" value="${this.user.street || ''}" type="text" custommaxlength="50" required
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-3 sm:col-span-2 relative" data-input-group>
						${this.generateLabelFor("house-number", false)}
						<input id="house-number" name="houseNumber" value="${this.user.houseNumber || ''}" type="text" custommaxlength="20"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-3 sm:col-span-2 relative" data-input-group>
						${this.generateLabelFor("postal-code", true)}
						<input id="postal-code" name="postalCode" value="${this.user.postalCode || ''}" type="text" custommaxlength="10" required autocomplete="on"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-3 sm:col-span-2 relative" data-input-group>
						${this.generateLabelFor("city", true)}
						<input id="city" name="city" value="${this.user.city || ''}" type="text" pattern="[A-Za-z\\s]+" custommaxlength="57" required
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-3 sm:col-span-2 relative" data-input-group>
						${this.generateLabelFor("country", true)}
						<input id="country" name="country" value="${this.user.country || ''}" type="text" pattern="[A-Za-z\\s]+" custommaxlength="56" required autocomplete="on"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
				</div>
			</div>
			${this.generateProfilingFooterMarkup()}
		`
		return html;
	}

	private generatePillarMarkup(pillarName: string): string {
		let keywords : Array<string>;
		switch (pillarName) {
			case "physical":
				keywords = ["Movement", "Nutrition", "Health"];
				break;
			case "economic":
				keywords = ["Services", "Conventions", "Answers"];
				break;
			case "psychological":
				keywords = ["Listening", "Closeness", "Growth"];
				break;
			case "family":
				keywords = ["Assistance", "Care", "Support"];
				break;
			default:
				break;
		}
		const markup = `
			<label role="button" class="col-span-2 md:col-span-1 bg-wf-${pillarName} h-full rounded shadow-lg select-none outline-4 outline-slate-500 border border-white has-[:checked]:outline py-1">
				<input type="checkbox" name="${pillarName}" class="appearance-none hidden" ${this.user[pillarName as keyof user] === "on" ? "checked" : ""}/>
				<div class="h-full flex flex-col items-center justify-center text-shadow-lg">
					<section class="text-xs uppercase hidden sm:block pb-3">
						Leonardo's Welfare is
					</section>
					<section class="tekne text-md sm:text-xl flex flex-col items-center">
						<span>${pillarName.charAt(0).toUpperCase() + pillarName.slice(1)}</span>
						<span>Wellbeing</span>
					</section>
					<section class="hidden sm:block">
						<svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
						</svg>
					</section>
					<section class="hidden sm:flex flex-col items-center">
						${keywords.reduce((finalString, keyword) => finalString += `<span>${keyword}</span>`, "")}
					</section>
				</div>
			</label>
		`
		return markup;
	}

	private generateThirdMarkup(): string {
		const html = `
			<div class="text-md text-center text-slate-500 pb-3">
				Choose your areas of interest
			</div>
			<div class="flex-grow flex pb-3 sm:pb-6">
				<div class="grid grid-rows-2 md:grid-rows-1 grid-cols-4 gap-4 w-full text-white text-shadow-lg">
					${["physical", "economic", "psychological", "family"].reduce(
						(finalString, pillarName) => finalString += this.generatePillarMarkup(pillarName), ""
					)}
				</div>
			</div>
			${this.generateProfilingFooterMarkup()}
		`
		return html;
	}

	private generateFinalMarkup(): string {
		const html = `
			<div class="flex-grow flex flex-col justify-between sm:justify-evenly pt-2 sm:pt-4">
				<div class="grid grid-rows-4 sm:grid-rows-2 grid-cols-6 gap-2 sm:gap-5 w-full">
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("email", true)}
						<input id="email" name="email" value="${this.user.email || ''}" type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring" autocomplete="on">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("confirm-email", true)}
						<input id="confirm-email" type="email" required match="#email"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("password", true)}
						<input id="password" name="password" type="password" required minlength="8" custommaxlength="25" uppercase="1" lowercase="1" digit="1" special="1 _*-+!?,.;:"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<button type="button" class="absolute right-0 top-0 h-10 me-3 flex items-center" data-type-toggler="password">
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
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("confirm-password", true)}
						<input id="confirm-password" type="password" required match="#password"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<button type="button" class="absolute right-0 top-0 h-10 me-3 flex items-center" data-type-toggler="confirm-password">
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
						<section class="text-xs text-rose-600 p-1"></section>
					</div>
				</div>
				<div class="flex flex-col ms-1 mb-2" data-input-group>
					<label for="policy" class="font-medium">Declaration of Consent*</label>
					<div class="flex items-center text-slate-600">
						<input type="checkbox" id="policy" class="shrink-0 h-5 sm:h-4 w-5 sm:w-4 me-3 sm:me-2 mt-0.5" required>
						<label for="policy">
							I have read the <a class="link-body-emphasis underline hover:text-black">Personal Data Protection Policy</a>
						</label>
					</div>
					<section class="text-xs text-rose-600 p-1"></section>
				</div>
			</div>
			${this.generateProfilingFooterMarkup()}
		`
		return html;
	}

	private generateProfilingFooterMarkup(): string {
		const html = `
			<div class="grid grid-rows-1 grid-cols-4 w-full">
				<div class="col-span-1 flex justify-start">
					<button type="button" id="backward-btn" class="${this.markupIndex === 0 ? 'hidden' : ''} ms-1 sm:ms-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-10 bi bi-arrow-left" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
						</svg>
					</button>
				</div>
				<div class="flex ${this.markupIndex === 3 ? 'col-span-3 justify-end' : 'col-span-2 justify-center'} sm:col-span-2 sm:justify-center select-none tekne text-md items-center">
					<span class="${this.markupIndex === 3 ? 'hidden' : ''}">
						${this.markupIndex + 1} / 4
					</span>
					<button id="register-btn" type="submit" class="${this.markupIndex === 3 ? '' : 'hidden'} sm:me-1 bg-rose-600 hover:bg-rose-800 shadow-md h-full rounded-md w-32 h-full mb-2 me-1 sm:me-0">
						<span class="text-white uppercase font-semibold text-sm sm:text-base text-shadow-md">Register<span>
					</button>
				</div>
				<div class="${this.markupIndex === 3 ? 'col-span-0' : 'col-span-1'} flex justify-end">
					<button type="button" id="forward-btn" class="${this.markupIndex === 3 ? 'hidden' : ''} me-1 sm:me-3">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-10 bi bi-arrow-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
						</svg>
					</button>
				</div>
			</div>
		`
		return html;
	}

	public override render(user: user, markupIndex: number, worksites: Map<number, string>): void {
		const secondMarkupIndex = 1;
		const finalMarkupIndex = 3;

		this.user = user;
		this.markupIndex = markupIndex;
		this.worksites = worksites;
		this.markup = this.generateLayoutMarkup();
		super.render();
		this.handleInputsValidation();
		if (markupIndex === secondMarkupIndex)
			this.handleWorksiteInput();
		if (markupIndex === finalMarkupIndex)
			this.handlePasswordInputTypeToggler();
	}

	private	handleInputsValidation() {
		const inputs = document.querySelectorAll("input");
		inputs.forEach(input => {
			["input", "blur"].forEach(eventType => {
				input.addEventListener(eventType, () => {
					const inputGroup = input.closest("[data-input-group]");
					if (!inputGroup)
						return;
					this.inputGroupCheckValidity(inputGroup);
				});
			});
		});
	}
	
	public addBackwordButtonClickHandler(handler: Function): void {
		const button = document.getElementById("backward-btn");
		if (!button)
			return;
		button.addEventListener('click', () => handler());
	}
	
	public addForwardButtonClickHandler(handler: Function): void {
		const button = document.getElementById("forward-btn");
		if (!button)
			return;
		const form = document.querySelector('form') as HTMLFormElement;
		button.addEventListener('click', () => {
			if (!this.formCheckValidity(form))
				return;
			const formData = new FormData(form);
			handler(formData);
		});
	}

	public addFormSubmitionHandler(handler: Function): void {
		const form = document.querySelector("form");
		form.addEventListener("submit", event => {
			event.preventDefault();
			if (!this.formCheckValidity(form))
				return ;
			const formData = new FormData(form);
			handler(formData);
		});
	}
		
	private generateWorksitesListMarkup(): string {
		let html = ``;
		for (const [key, value] of this.worksites) {
			html += `
				<li role="button" value="${key}" class="block w-full whitespace-nowrap px-2 py-2 text-sm truncate text-neutral-700 hover:bg-slate-100 focus:bg-slate-100 text-left" data-worksite-option>${value}</li>
			`
		};
		return html;
	}

	private handleWorksiteInput(): void {
		const searchInput = document.getElementById("worksite") as HTMLInputElement;
		const hiddenInput = document.getElementById("hidden-worksite") as HTMLInputElement;
		const dropdownBody = document.getElementById("worksite-dropdown-body");
		const worksiteOptions = dropdownBody.querySelectorAll("[data-worksite-option]") as NodeListOf<HTMLButtonElement>;

		searchInput.addEventListener("focus", () => dropdownBody.classList.remove("hidden"));
		searchInput.addEventListener("blur", () => dropdownBody.classList.add("hidden"));

		searchInput.addEventListener("input", () => {
			let inputValue = searchInput.value.toLowerCase();
			worksiteOptions.forEach(option => {
				const optionContent = option.textContent.toLowerCase();
				option.style.display = optionContent.includes(inputValue) ? '' : 'none';
			});
		});

		worksiteOptions.forEach(option => {
			option.addEventListener("mouseover", () => {
				hiddenInput.value = option.value;
				searchInput.value = option.innerText;
			});
		});
	}

	private handlePasswordInputTypeToggler(): void {
		const buttons = document.querySelectorAll("[data-type-toggler]") as NodeListOf<HTMLElement>;

		buttons.forEach((button) => {
			const inputId = button.dataset.typeToggler;
			const input = document.getElementById(inputId) as HTMLInputElement;
			const eyeSvg = button.querySelector(".bi-eye");
			const eyeSlashSvg = button.querySelector(".bi-eye-slash");

			button.addEventListener("click", () => {
				const inputType = input.type;
				input.type = inputType === "password" ? "text" : "password";
				eyeSvg.classList.toggle("hidden");
				eyeSlashSvg.classList.toggle("hidden");
			});
		});
	}
	
	private getOffsetDate(offset: number) : string {
		const today = new Date();
	
		const yyyy = today.getFullYear();
		const mm = today.getMonth() + 1;
		const dd = today.getDate();
		const date = `${yyyy - offset}-${mm < 10 ? ('0' + mm) : mm}-${dd < 10 ? ('0' + dd) : dd}`;
	
		return date;
	}
}