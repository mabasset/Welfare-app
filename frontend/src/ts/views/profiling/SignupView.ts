import AProfilingView from "./AProfilingView";
import { CustomError, getOffsetDate } from "../../helpers";

export default class SignupView extends AProfilingView {

	override documentTitle = "Signup";
	override mainClassName = "w-full max-w-screen-md mx-auto my-6 sm:my-10";
	private	markupIndex = 0;
	private user = new Map<string, string>();
	private worksites = new Map<number, string>();
	private areasOfInterest = new Map([
		["physical", ["Movement", "Nutrition", "Health"]],
		["economic", ["Services", "Conventions", "Answers"]],
		["psychological", ["Listening", "Closeness", "Growth"]],
		["family", ["Assistance", "Care", "Support"]]
	]);

	constructor(
		private saveUserDataInSessionStorage: (user: Map<string, string>) => void,
		private registerUser: (formData: FormData) => Promise<void>,
	) {
		super();
	}

	override render(user: Map<string, string>, worksite: Map<number, string>) {
		this.markupIndex = 0;
		this.user = user;
		this.worksites = worksite;
		super.render();
	}

	override generateMainMarkup() {
		const personalData = () => `
			<div class="flex-grow flex items-center pt-2 sm:pt-4 text-sm">
				<div class="grid grid-rows-5 sm:grid-rows-3 grid-cols-6 gap-4 sm:gap-6 w-full">
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("name", true)}
						<input id="name" name="name" value="${this.user.get("name") || ''}" type="text" autocomplete="given-name" autocomplete="on"
							required
							minlength=${NAME_MIN_LENGTH}
							custommaxlength=${NAME_MAX_LENGTH}
							pattern=${NAME_PATTERN}>
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("surname", true)}
						<input id="surname" name="surname" value="${this.user.get("surname") || ''}" type="text" autocomplete="family-name"
							required
							minlength=${SURNAME_MIN_LENGTH}
							custommaxlength=${SURNAME_MAX_LENGTH}
							pattern=${SURNAME_PATTERN}>
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("birthday", true)}
						<input id="birthday" name="birthday" value="${this.user.get("birthday") || ''}" type="date" autocomplete="bday"
							required
							min="${getOffsetDate(Number(BIRTHDAY_MIN_OFFSET))}"
							max="${getOffsetDate(Number(BIRTHDAY_MAX_OFFSET))}">
						<section></section>
					</div>
					<div class="col-span-3 relative">
						${this.generateLabelFor("interest", false)}
						<select id="interest" name="interest" >
							<option class="hidden"></option>
							<option value="0" ${this.user.get("interest") === "0" ? 'selected' : ''}>Sport</option>
							<option value="1" ${this.user.get("interest") === "1" ? 'selected' : ''}>Reading</option>
							<option value="2" ${this.user.get("interest") === "2" ? 'selected' : ''}>Relax</option>
							<option value="3" ${this.user.get("interest") === "3" ? 'selected' : ''}>Prevention</option>
							<option value="4" ${this.user.get("interest") === "4" ? 'selected' : ''}>Other...</option>
						</select>
					</div>
					<div class="col-span-3 sm:col-span-2 relative">
						${this.generateLabelFor("marital-status", false)}
						<select id="marital-status" name="marital_status" >
							<option class="hidden"></option>
							<option value="0" ${this.user.get("marital_status") === "0" ? 'selected' : ''}>Single</option>
							<option value="1" ${this.user.get("marital_status") === "1" ? 'selected' : ''}>Married</option>
						</select>
					</div>
					<div class="col-span-3 sm:col-span-2 relative">
						${this.generateLabelFor("childrens", false)}
						<select id="childrens" name="childrens" >
							<option class="hidden"></option>
							<option value="false" ${this.user.get("childrens") === "false" ? 'selected' : ''}>No</option>
							<option value="true" ${this.user.get("childrens") === "true" ? 'selected' : ''}>Yes</option>
						</select>
					</div>
					<div class="col-span-3 sm:col-span-2 relative">
						${this.generateLabelFor("elderly-parents", false)}
						<select id="elderly-parents" name="elderly_parents" >
							<option class="hidden"></option>
							<option value="false" ${this.user.get("elderly_parents") === "false" ? 'selected' : ''}>No</option>
							<option value="true" ${this.user.get("elderly_parents") === "true" ? 'selected' : ''}>Yes</option>
						</select>
					</div>
				</div>
			</div>
		`;
		const localization = () => {
			const worksitesList = () => {
				if (this.worksites.size === 0)
					return ``;
				return `
					<ul class="hidden ps-2 pe-3 pb-2 mt-px absolute bg-white w-full rounded bg-clip-padding text-left text-base shadow-lg z-20 max-h-36 overflow-y-auto overflow-x-hidden" data-searchbar-dropdown>
						${Array.from((this.worksites as Map<number, string>).entries()).map(([key, value]) => `<li role="button" value="${key}" class="block w-full whitespace-nowrap px-2 py-2 text-sm truncate text-neutral-700 hover:bg-slate-100 focus:bg-slate-100 text-left" data-searchbar-option>${value}</li>`).join("")}
					</ul>
				`;
			};
			return `
				<div class="flex-grow flex items-center pt-2 sm:pt-4">
					<div class="grid grid-rows-4 sm:grid-rows-3 grid-cols-6 gap-3 sm:gap-6 w-full">
						<div class="col-span-6 relative" data-input-group data-searchbar>
							${this.generateLabelFor("worksite", true)}
							<input id="worksite" value="${this.user.get("worksite") && this.worksites.get(Number(this.user.get("worksite"))) ? this.worksites.get(Number(this.user.get("worksite"))) : ''}" type="search" autocomplete="off"
								required
								match="[data-searchbar-option]"
								 data-searchbar-input>
							<section></section>
							${worksitesList()}
							<input id="hidden-worksite" name="worksite" value="${this.user.get("worksite") || ''}" type="hidden" data-searchbar-hidden-input>
						</div>
						<div class="col-span-6 relative" data-input-group>
							${this.generateLabelFor("street", true)}
							<input id="street" name="street" value="${this.user.get("street") || ''}" type="text" autocomplete="street-address"
								required
								custommaxlength=${STREET_MAX_LENGTH}
								pattern=${STREET_PATTERN}>
							<section></section>
						</div>
						<div class="col-span-3 sm:col-span-2 relative" data-input-group>
							${this.generateLabelFor("postal-code", true)}
							<input id="postal-code" name="postal_code" value="${this.user.get("postal_code") || ''}" type="text" autocomplete="postal-code" autocomplete="on"
								required
								custommaxlength=${POSTAL_CODE_MAX_LENGTH}>
							<section></section>
						</div>
						<div class="col-span-3 sm:col-span-2 relative" data-input-group>
							${this.generateLabelFor("city", true)}
							<input id="city" name="city" value="${this.user.get("city") || ''}" type="text"
								required
								custommaxlength=${CITY_MAX_LENGTH}
								pattern=${CITY_PATTERN}>
							<section></section>
						</div>
						<div class="col-span-6 sm:col-span-2 relative" data-input-group>
							${this.generateLabelFor("country", true)}
							<input id="country" name="country" value="${this.user.get("country") || ''}" type="text" autocomplete="country-name" autocomplete="on"
								required
								custommaxlength=${COUNTRY_MAX_LENGTH}
								pattern=${COUNTRY_PATTERN}>
							<section></section>
						</div>
					</div>
				</div>
			`;
		};
		const areasOfInterest = () => {
			const pillars = () => {
				let pillarsMarkup = ``;
				for (const [key, value] of this.areasOfInterest.entries()) {
					pillarsMarkup += `
						<label role="button" class="col-span-2 md:col-span-1 bg-wf-${key} h-full rounded shadow-lg select-none outline-4 outline-slate-500 border border-white has-[:checked]:outline py-1">
							<input type="checkbox" name="${key}" class="appearance-none hidden" ${this.user.get(key) === "true" ? "checked" : ""}/>
							<div class="h-full flex flex-col items-center justify-center text-shadow-lg">
								<section class="text-xs uppercase hidden sm:block pb-3">
									Leonardo's Welfare is
								</section>
								<section class="tekne text-md sm:text-xl flex flex-col items-center">
									<span>${key.charAt(0).toUpperCase() + key.slice(1)}</span>
									<span>Wellbeing</span>
								</section>
								<section class="hidden sm:block">
									<svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
									</svg>
								</section>
								<section class="hidden sm:flex flex-col items-center">
									${value.reduce((keywordGroup, keyword) => keywordGroup += `<span>${keyword}</span>`, "")}
								</section>
							</div>
						</label>
					`;
				}
				return pillarsMarkup;
			}
			return `
				<div class="text-md text-center text-slate-500 pb-3">
					Choose your areas of interest
				</div>
				<div class="flex-grow flex pb-3 sm:pb-6">
					<div class="grid grid-rows-2 md:grid-rows-1 grid-cols-4 gap-4 w-full text-white text-shadow-lg">
						${pillars()}
					</div>
				</div>
			`
		};
		const registration = () => `
			<div class="flex-grow flex flex-col justify-center">
				<div class="grid grid-rows-4 sm:grid-rows-2 grid-cols-6 gap-3 sm:gap-6 w-full">
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("email", true)}
						<input id="email" name="email" type="email" autocomplete="email" autocomplete="on"
							required
							custommaxlength="100"
							pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+">
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("confirm-email", true)}
						<input id="confirm-email" type="email" autocomplete="email" autocomplete="off"
							required
							match="#email">
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("password", true)}
						<input id="password" name="password" type="password" autocomplete="new-password"
							required
							minlength=${PASSWORD_MIN_LENGTH}
							custommaxlength=${PASSWORD_MAX_LENGTH}
							lowercase=${PASSWORD_MIN_AMOUNT_LOWER}
							uppercase=${PASSWORD_MIN_AMOUNT_UPPER}
							digit=${PASSWORD_MIN_AMOUNT_DIGIT}
							special="${PASSWORD_MIN_AMOUNT_SPECIAL} ${PASSWORD_SPECIAL_CHARACTERS}">
						${this.generatePasswordTogglerMarkup("password")}
						<section></section>
					</div>
					<div class="col-span-6 sm:col-span-3 relative" data-input-group>
						${this.generateLabelFor("confirm-password", true)}
						<input id="confirm-password" type="password" autocomplete="new-password"
							required
							match="#password">
						${this.generatePasswordTogglerMarkup("confirm-password")}
						<section></section>
					</div>
				</div>
				<div class="m-2 sm:m-4">
				</div>
				<div class="flex flex-col ms-1 mb-2" data-input-group>
					<div>
						<label for="policy" class="font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Declaration of Consent</label>
					</div>
					<div class="flex items-center text-slate-600 text-sm">
						<input type="checkbox" id="policy" class="shrink-0 h-4 sm:h-4 w-5 sm:w-4 me-3 sm:me-2 mt-0.5" required>
						<label for="policy">
							I have read the <a href="https://www.leonardo.com/en/privacy-policy" target="_blank" class="link-body-emphasis underline hover:text-black" data-open-window="privacy-policy">Personal Data Protection Policy</a>
						</label>
					</div>
					<section></section>
				</div>
			</div>
		`;
		const	markupGeneratorFunctions = [
			personalData, localization, areasOfInterest, registration
		];
		return `
			<form id="signup-form" class="min-h-96 bg-white sm:rounded-lg p-4 pt-6 sm:p-8 w-full flex flex-col" novalidate>
				${markupGeneratorFunctions[this.markupIndex].call(this)}
				<div class="grid grid-rows-1 grid-cols-4 w-full">
					<div class="col-span-1 flex justify-start">
						<button id="backward-btn" type="button" class="${this.markupIndex === 0 ? 'hidden' : ''} ms-1 sm:ms-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-10 bi bi-arrow-left" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
							</svg>
						</button>
					</div>
					<div class="flex ${this.markupIndex === 3 ? 'col-span-3 justify-end' : 'col-span-2 justify-center'} sm:col-span-2 sm:justify-center select-none tekne text-md items-center">
						<span class="${this.markupIndex === 3 ? 'hidden' : ''}">
							${this.markupIndex + 1} / 4
						</span>
						<button class="${this.markupIndex === 3 ? '' : 'hidden'} w-9/12 h-10 text-white px-4 py-2 shadow-md rounded-md bg-rose-400 enabled:bg-rose-600 enabled:hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 group">
							<span class="uppercase font-semibold text-sm sm:text-base text-shadow-md leading-6 group-disabled:hidden">
								Register
							</span>
							<svg class="animate-spin size-5 mx-auto hidden group-disabled:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						</button>
					</div>
					<div class="${this.markupIndex === 3 ? 'col-span-0' : 'col-span-1'} flex justify-end">
						<button class="${this.markupIndex === 3 ? 'hidden' : ''} me-1 sm:me-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-10 bi bi-arrow-right" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
							</svg>
						</button>
					</div>
				</div>
			</form>
		`;
	}

	override addEventHandlers() {
		(function signupForm(this: SignupView) {
			const updateMainMarkup = (offset: number) => {
				this.markupIndex += offset;
				document.querySelector("main")!.innerHTML = this.generateMainMarkup();
				this.addEventHandlers();
			};
			(function backwardBtnCLick() {
				const handler = () =>
					updateMainMarkup(-1);
				document.getElementById("backward-btn")?.addEventListener("click", handler);
			})();
			(function submition(this: SignupView) {
				const form = document.getElementById("signup-form") as HTMLFormElement;
				const handler = (event: SubmitEvent) => {
					const submitUserDataToServer = async () => {
						const submitter = event.submitter as HTMLButtonElement;
						submitter.disabled = true;
						for(const [key, value] of this.user.entries())
							formData.set(key, value);
						try {
							await this.registerUser(formData);
						}
						catch (error) {
							submitter.disabled = false;
							const alertText = error instanceof CustomError && error.code === 409 ?
								"This email address is already registered." :
									"Something went wrong. Please try again later.";
							this.renderAlert(0, alertText);
						}
					};
					const saveUserDataAndMoveForward = () => {
						if (this.markupIndex === 2)
							for (const key of this.areasOfInterest.keys())
								formData.set(key, formData.has(key) ? "true" : "false");
						for(const [key, value] of formData)
							if (value && typeof value === "string")
								this.user.set(key, value);
						this.saveUserDataInSessionStorage(this.user);
						updateMainMarkup(1);
					};
					event.preventDefault();
					if (!this.formCheckValidity(form))
						return ;
					const formData = new FormData(form);
					if (this.markupIndex === 3)
						submitUserDataToServer();
					else
						saveUserDataAndMoveForward();
				};
				form?.addEventListener("submit", handler);
			}).call(this);
		}).call(this);
		(function searchBar(){
			const searchBar = document.querySelector("[data-searchbar]") as HTMLElement;
			if (!searchBar)
				return ;
			const input = searchBar.querySelector("[data-searchbar-input]") as HTMLInputElement;
			const hiddenInput = searchBar.querySelector("[data-searchbar-hidden-input]") as HTMLInputElement;
			const dropdown = searchBar.querySelector("[data-searchbar-dropdown]");
			const options = dropdown?.querySelectorAll("[data-searchbar-option]") as NodeListOf<HTMLButtonElement>;
			input.addEventListener("focus", () => dropdown?.classList.remove("hidden"));
			input.addEventListener("blur", () => dropdown?.classList.add("hidden"));
			input.addEventListener("input", () => {
				let inputValue = input.value.toLowerCase();
				options.forEach(option => {
					const optionContent = option.textContent?.toLowerCase();
					option.style.display = optionContent?.includes(inputValue) ? '' : 'none';
				});
			});
			options.forEach(option => {
				option.addEventListener("mouseover", () => {
					hiddenInput.value = option.value;
					input.value = option.innerText;
				});
			});
		})();
		super.addEventHandlers();
	}
}