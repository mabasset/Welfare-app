import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {
	private user: user = {};
	private markupIndex = 0;
	private markupGenerationFunctions = new Array<Function>;
	private worksites = new Map<number, string>;
	private pillars = ["physical", "economic", "psychological", "family"];

	
	constructor() {
		super();
		this.markupGenerationFunctions.push(this.generateFirstMarkup);
		this.markupGenerationFunctions.push(this.generateSecondMarkup);
		this.markupGenerationFunctions.push(this.generateThirdMarkup);
		this.markupGenerationFunctions.push(this.generateFinalMarkup);
	}

	public override render(user: user, markupIndex: number, worksites: Map<number, string>): void {
		const secondMarkupIndex = 1;
		const finalMarkupIndex = 3;

		this.user = user;
		this.markupIndex = markupIndex;
		this.worksites = worksites;
		this.markup = this.generateMarkup();
		super.render();
		this.handleInputsValidation();
		if (markupIndex === secondMarkupIndex)
			this.handleWorksiteInput();
		if (markupIndex === finalMarkupIndex)
			this.handlePasswordInputTypeToggler();
	}

	protected override generateMainMarkup(): string {
		const html = `
			<main class="w-full max-w-screen-md mx-auto my-6 sm:my-10">
				<form class="min-h-96 bg-white sm:rounded-lg p-4 pt-6 sm:p-8 w-full flex flex-col" novalidate>
					${this.markupGenerationFunctions[this.markupIndex].call(this)}
				</form>
			</main>
		`
		return html;
	}

	private generateFirstMarkup(): string {
		const html = `
			<div class="flex-grow flex items-center pt-2 sm:pt-4 text-sm">
				<div class="grid grid-rows-5 sm:grid-rows-3 grid-cols-6 gap-4 sm:gap-6 w-full">
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("name", true)}
						<input id="name" name="name" value="${this.user.name || ''}" type="text" autocomplete="given-name" autocomplete="on"
							required
							minlength=${NAME_MIN_LENGTH}
							custommaxlength=${NAME_MAX_LENGTH}
							pattern=${NAME_PATTERN}
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("surname", true)}
						<input id="surname" name="surname" value="${this.user.surname || ''}" type="text" autocomplete="family-name"
							required
							minlength=${SURNAME_MIN_LENGTH}
							custommaxlength=${SURNAME_MAX_LENGTH}
							pattern=${SURNAME_PATTERN}
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("birthday", true)}
						<input id="birthday" name="birthday" value="${this.user.birthday || ''}" type="date" autocomplete="bday"
							required
							min="${this.getOffsetDate(Number(BIRTHDAY_MIN_OFFSET))}"
							max="${this.getOffsetDate(Number(BIRTHDAY_MAX_OFFSET))}"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
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
				<div class="grid grid-rows-4 sm:grid-rows-3 grid-cols-6 gap-4 sm:gap-6 w-full">
					<div class="col-span-6 relative" data-input-group>
						${this.generateLabelFor("worksite", true)}
						<input id="worksite" value="${this.user.worksite ? this.worksites.get(Number(this.user.worksite)) : ''}" type="search" autocomplete="off" required
							match="[data-worksite-option]"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
						<ul id="worksite-dropdown-body" class="hidden ps-2 pe-3 pb-2 mt-px absolute bg-white w-full rounded bg-clip-padding text-left text-base shadow-lg z-20 max-h-36 overflow-y-auto overflow-x-hidden">
							${this.generateWorksitesListMarkup()}
						</ul>
						<input id="hidden-worksite" name="worksite" value="${this.user.worksite || ''}" type="hidden">
					</div>
					<div class="col-span-6 relative" data-input-group>
						${this.generateLabelFor("street", true)}
						<input id="street" name="street" value="${this.user.street || ''}" type="text" autocomplete="street-address"
							required
							custommaxlength=${STREET_MAX_LENGTH}
							pattern=${STREET_PATTERN}
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
					</div>
					<div class="col-span-3 sm:col-span-2 relative" data-input-group>
						${this.generateLabelFor("postal-code", true)}
						<input id="postal-code" name="postalCode" value="${this.user.postalCode || ''}" type="text" autocomplete="postal-code"
							required
							custommaxlength=${POSTAL_CODE_MAX_LENGTH}
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
					</div>
					<div class="col-span-3 sm:col-span-2 relative" data-input-group>
						${this.generateLabelFor("city", true)}
						<input id="city" name="city" value="${this.user.city || ''}" type="text"
							required
							custommaxlength=${CITY_MAX_LENGTH}
							pattern=${CITY_PATTERN}
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-2 relative" data-input-group>
						${this.generateLabelFor("country", true)}
						<input id="country" name="country" value="${this.user.country || ''}" type="text" autocomplete="country-name"
							required
							custommaxlength=${COUNTRY_MAX_LENGTH}
							pattern=${COUNTRY_PATTERN}
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
					</div>
				</div>
			</div>
			${this.generateProfilingFooterMarkup()}
		`
		return html;
	}

	private generateThirdMarkup(): string {
		const html = `
			<div class="text-md text-center text-slate-500 pb-3">
				Choose your areas of interest
			</div>
			<div class="flex-grow flex pb-3 sm:pb-6">
				<div class="grid grid-rows-2 md:grid-rows-1 grid-cols-4 gap-4 w-full text-white text-shadow-lg">
					${this.pillars.reduce(
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
			<div class="flex-grow flex flex-col justify-center pt-2">
				<div class="grid grid-rows-4 sm:grid-rows-2 grid-cols-6 gap-4 sm:gap-6 w-full">
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("email", true)}
						<input id="email" name="email" type="email" autocomplete="email"
							required
							custommaxlength=${EMAIL_MAX_LENGTH}
							pattern=${EMAIL_PATTERN}
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring" autocomplete="on">
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("confirm-email", true)}
						<input id="confirm-email" type="email" required match="#email" autocomplete="off"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("password", true)}
						<input id="password" name="password" type="password" required autocomplete="off"
							minlength=${PASSWORD_MIN_LENGTH}
							custommaxlength=${PASSWORD_MAX_LENGTH}
							lowercase=${PASSWORD_MIN_AMOUNT_LOWER}
							uppercase=${PASSWORD_MIN_AMOUNT_UPPER}
							digit=${PASSWORD_MIN_AMOUNT_DIGIT}
							special="${PASSWORD_MIN_AMOUNT_SPECIAL} ${PASSWORD_SPECIAL_CHARACTERS}"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						${this.generatePasswordTogglerMarkup()}
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("confirm-password", true)}
						<input id="confirm-password" type="password" autocomplete="new-password" required match="#password"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						${this.generatePasswordTogglerMarkup()}
						<section></section>
					</div>
				</div>
				<div class="m-2 sm:m-4">
				</div>
				<div class="flex flex-col ms-1 mb-2" data-input-group>
					<div>
						<label for="policy" class="font-medium">Declaration of Consent*</label>
					</div>
					<div class="flex items-center text-slate-600 text-sm">
						<input type="checkbox" id="policy" class="shrink-0 h-4 sm:h-4 w-5 sm:w-4 me-3 sm:me-2 mt-0.5" required>
						<label for="policy">
							I have read the <a class="link-body-emphasis underline hover:text-black">Personal Data Protection Policy</a>
						</label>
					</div>
					<section></section>
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
				keywords = [];
				break;
		}
		const markup = `
			<label role="button" class="col-span-2 md:col-span-1 bg-wf-${pillarName} h-full rounded shadow-lg select-none outline-4 outline-slate-500 border border-white has-[:checked]:outline py-1">
				<input type="checkbox" name="${pillarName}" class="appearance-none hidden" ${this.user[pillarName as keyof user] === "1" ? "checked" : ""}/>
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

	private generateWorksitesListMarkup(): string {
		let html = ``;
		for (const [key, value] of this.worksites) {
			html += `
				<li role="button" value="${key}" class="block w-full whitespace-nowrap px-2 py-2 text-sm truncate text-neutral-700 hover:bg-slate-100 focus:bg-slate-100 text-left" data-worksite-option>${value}</li>
			` 
		};
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
					<button id="register-btn" type="submit" class="${this.markupIndex === 3 ? '' : 'hidden'} w-48 py-2 shadow-md rounded-md bg-rose-600 hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
						<span class="uppercase text-white font-semibold text-sm sm:text-base text-shadow-md leading-6">Register<span>
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
			if (this.markupIndex === 2) {
				this.pillars.forEach(name => {
					if(formData.has(name))
						formData.set(name, "1");
					else
						formData.append(name, "0");
				});
			}
			handler(formData);
		});
	}

	private handleWorksiteInput(): void {
		const searchInput = document.getElementById("worksite") as HTMLInputElement;
		const hiddenInput = document.getElementById("hidden-worksite") as HTMLInputElement;
		const dropdownBody = document.getElementById("worksite-dropdown-body");
		if (!dropdownBody)
			return ;
		const worksiteOptions = dropdownBody.querySelectorAll("[data-worksite-option]") as NodeListOf<HTMLButtonElement>;

		searchInput.addEventListener("focus", () => dropdownBody.classList.remove("hidden"));
		searchInput.addEventListener("blur", () => dropdownBody.classList.add("hidden"));

		searchInput.addEventListener("input", () => {
			let inputValue = searchInput.value.toLowerCase();
			worksiteOptions.forEach(option => {
				const optionContent = option.textContent?.toLowerCase();
				option.style.display = optionContent?.includes(inputValue) ? '' : 'none';
			});
		});

		worksiteOptions.forEach(option => {
			option.addEventListener("mouseover", () => {
				hiddenInput.value = option.value;
				searchInput.value = option.innerText;
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