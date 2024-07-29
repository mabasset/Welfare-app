import AProfilingView from "./AProfilingView";

enum markupEnum {
	PersonalData,
	Localization,
	Welfare,
}

export default class extends AProfilingView {

	private user: user;
	private markupIndex: number;
	private worksites: Map<number, string>;
	
	constructor() {
		super();
	}

	protected override generateMarkup(): string {
		let markup;

		switch (this.markupIndex) {
			case markupEnum.PersonalData:
				markup = this.generatePersonalDataMarkup();
				break;
			case markupEnum.Localization:
				markup = this.generateLocalizationMarkup();
				break;
			case markupEnum.Welfare:
				markup = this.generateWelfarePillarsMarkup();
				break;
			default:
				break;
		}
		return markup;
	}

	private generatePersonalDataMarkup(): string {
		return `
			<form class="min-h-96 bg-white sm:rounded-lg p-4 sm:p-8 w-full flex flex-col">
				<div class="flex-grow flex items-center pt-2 sm:pt-4">
					<div class="grid grid-rows-5 sm:grid-rows-3 grid-cols-6 gap-5 sm:gap-10 w-full">
						<div class="col-span-6 sm:col-span-3 relative">
							${this.generateLabelFor("name", true)}
							<input id="name" name="name" value="${this.user.name || ''}" type="text" pattern="[^\\d]+" minlength="2" maxlength="50" required
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 invalid:border-red-600 invalid:ring-red-600 valid:border-green-600 valid:ring-green-600">
						</div>
						<div class="col-span-6 sm:col-span-3 relative">
							${this.generateLabelFor("surname", true)}
							<input id="surname" name="surname" value="${this.user.surname || ''}" type="text" pattern="[^\\d]+" minlength="2" maxlength="50" required
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 invalid:border-red-600 invalid:ring-red-600 valid:border-green-600 valid:ring-green-600">
						</div>
						<div class="col-span-6 sm:col-span-3 relative">
							${this.generateLabelFor("birthday", true)}
							<input id="birthday" name="birthday" value="${this.user.birthday || ''}" type="date" min="${this.getOffsetDate(100)}" max="${this.getOffsetDate(15)}" required
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 invalid:border-red-600 invalid:ring-red-600 valid:border-green-600 valid:ring-green-600">
						</div>
						<div class="col-span-3 relative">
							${this.generateLabelFor("interest", false)}
							<select id="interest" name="interest" class="truncate text-sm w-full pl-3 pr-10 h-10 outline-none border rounded border-slate-400 focus:ring-1 focus:ring-slate-500">
								<option value="null" class="hidden"></option>
								<option value="0" ${this.user.interest === "0" ? 'selected' : ''}>Sport</option>
								<option value="1" ${this.user.interest === "1" ? 'selected' : ''}>Reading</option>
								<option value="2" ${this.user.interest === "2" ? 'selected' : ''}>Relax</option>
								<option value="3" ${this.user.interest === "3" ? 'selected' : ''}>Prevention</option>
								<option value="4" ${this.user.interest === "4" ? 'selected' : ''}>Other...</option>
							</select>
						</div>
						<div class="col-span-3 sm:col-span-2 relative">
							${this.generateLabelFor("marital-status", false)}
							<select id="marital-status" name="maritalStatus" class="truncate text-sm w-full pl-3 pr-10 h-10 outline-none border rounded border-slate-400 focus:ring-1 focus:ring-slate-500">
								<option value="null" class="hidden"></option>
								<option value="Single" ${this.user.maritalStatus === "Single" ? 'selected' : ''}>Single</option>
								<option value="Married" ${this.user.maritalStatus === "Married" ? 'selected' : ''}>Married</option>
							</select>
						</div>
						<div class="col-span-3 sm:col-span-2 relative">
							${this.generateLabelFor("childrens", false)}
							<select id="childrens" name="childrens" class="truncate text-sm w-full pl-3 pr-10 h-10 outline-none border rounded border-slate-400 focus:ring-1 focus:ring-slate-500">
								<option value="null" class="hidden"></option>
								<option value="0" ${this.user.childrens === "0" ? 'selected' : ''}>No</option>
								<option value="1" ${this.user.childrens === "1" ? 'selected' : ''}>Yes</option>
							</select>
						</div>
						<div class="col-span-3 sm:col-span-2 relative">
							${this.generateLabelFor("elderly-parents", false)}
							<select id="elderly-parents" name="elderlyParents" class="truncate text-sm w-full pl-3 pr-10 h-10 outline-none border rounded border-slate-400 focus:ring-1 focus:ring-slate-500">
								<option value="null" class="hidden"></option>
								<option value="0" ${this.user.elderlyParents === "0" ? 'selected' : ''}>No</option>
								<option value="1" ${this.user.elderlyParents === "1" ? 'selected' : ''}>Yes</option>
							</select>
						</div>
					</div>
				</div>
				${this.generateProfilingFooterMarkup()}
			</form>
		`
	}

	private generateLocalizationMarkup(): string {
		console.log(this.user.worksite)
		return `
			<form class="min-h-96 bg-white sm:rounded-lg p-4 sm:p-8 w-full flex flex-col">
				<div class="flex-grow flex items-center pt-2 sm:pt-4">
					<div class="grid grid-rows-4 sm:grid-rows-3 grid-cols-6 gap-5 sm:gap-10 w-full">
						<div class="col-span-6 relative">
							${this.generateLabelFor("worksite", true)}
							<button type="button" id="worksite" class="truncate bg-white text-start text-sm absolute w-full outline-none border rounded px-3 h-10 ${this.user.worksite ? "border-green-600 ring-green-600" : "border-red-600 ring-red-600"}">
								${this.user.worksite ? this.worksites.get(Number(this.user.worksite)) : ''}
							</button>
							<input id="worksite-input" name="worksite" value="${this.user.worksite || ''}" tabindex="-1" type="text" class="outline-none w-full h-10" required>
							<ul id="worksite-dropdown-body" class="ps-2 pe-3 pb-2 mt-px hidden absolute bg-white w-full rounded bg-clip-padding text-left text-base shadow-lg z-20 max-h-36 overflow-y-auto overflow-x-hidden">
								<li class="sticky top-0 bg-white pt-2 w-full">
									<input id="worksite-search-bar" placeholder="Search" type="search" class="text-sm block min-h-[auto] w-full rounded border bg-transparent p-2 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100">
								</li>
								${this.generateWorksitesListMarkup()}
							</ul>
						</div>
						<div class="col-span-6 sm:col-span-4 relative">
							${this.generateLabelFor("street", true)}
							<input id="street" name="street" value="${this.user.street || ''}" type="text" maxlength="50" required
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 invalid:border-red-600 invalid:ring-red-600 valid:border-green-600 valid:ring-green-600">
						</div>
						<div class="col-span-3 sm:col-span-2 relative">
							${this.generateLabelFor("house-number", false)}
							<input id="house-number" name="houseNumber" value="${this.user.houseNumber || ''}" type="text" maxlength="20"
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 border-slate-400 focus:ring-slate-500">
						</div>
						<div class="col-span-3 sm:col-span-2 relative">
							${this.generateLabelFor("postal-code", true)}
							<input id="postal-code" name="postalCode" value="${this.user.postalCode || ''}" type="text" maxlength="10" required
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 invalid:border-red-600 invalid:ring-red-600 valid:border-green-600 valid:ring-green-600">
						</div>
						<div class="col-span-3 sm:col-span-2 relative">
							${this.generateLabelFor("city", true)}
							<input id="city" name="city" value="${this.user.city || ''}" type="text" pattern="[A-Za-z\\s]+" maxlength="57" required
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 invalid:border-red-600 invalid:ring-red-600 valid:border-green-600 valid:ring-green-600">
						</div>
						<div class="col-span-3 sm:col-span-2 relative">
							${this.generateLabelFor("country", true)}
							<input id="country" name="country" value="${this.user.country || ''}" type="text" pattern="[A-Za-z\\s]+" maxlength="56" required
								class="truncate text-sm w-full outline-none border rounded px-3 h-10 focus:ring-1 invalid:border-red-600 invalid:ring-red-600 valid:border-green-600 valid:ring-green-600">
						</div>
					</div>
				</div>
				${this.generateProfilingFooterMarkup()}
			</form>
		`
	}

	private generateWelfarePillarsMarkup(): string {
		return `
			<form class="min-h-96 bg-white sm:rounded-lg p-4 sm:p-8 w-full flex flex-col">
				<div class="text-md text-center text-slate-500 pb-3">
					Choose your areas of interest
				</div>
				<div class="flex-grow flex pb-3 sm:pb-6">
					<div class="grid grid-rows-2 md:grid-rows-1 grid-cols-4 gap-3 w-full text-white text-shadow-lg">
						${["physical", "economic", "psychological", "family"].reduce(
							(finalString, pillarName) => finalString += this.generatePillarMarkup(pillarName), ""
						)}
					</div>
				</div>
				${this.generateProfilingFooterMarkup()}
			</form>
		`
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
			<label role="button" class="col-span-2 md:col-span-1 bg-wf-${pillarName} h-full rounded shadow-lg outline-4 outline-slate-800 has-[:checked]:outline">
				<input type="checkbox" name="${pillarName}" class="hidden"/>
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

	private generateProfilingFooterMarkup(): string {
		return `
			<div class="flex justify-between items-center w-full">
				<div class="w-1/3 flex">
					<button type="button" id="backwards-btn" class="${this.markupIndex === 0 ? 'hidden' : ''} ms-2 sm:ms-3">
						<svg xmlns="http://www.w3.org/2000/svg" height="40" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
						</svg>
					</button>
				</div>
				<div class="w-1/3 text-center select-none tekne text-md">
					${this.markupIndex + 1} / 4
				</div>
				<div class="w-1/3 flex justify-end">
					<button type="submit" class="${this.markupIndex === 3 ? 'hidden' : ''} me-2 sm:me-3">
						<svg xmlns="http://www.w3.org/2000/svg" height="40" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
						</svg>
					</button>
				</div>
			</div>
		`
	}

	public override render(user: user, markupIndex: number, worksites: Map<number, string>): void {
		this.user = user;
		this.markupIndex = markupIndex;
		this.worksites = worksites;
		this.markup = this.generateLayoutMarkup();
		super.render();
		if (this.markupIndex === markupEnum.Localization)
			this.addWorksitesOptionsHandler();
	}
	
	public addPreviousSectionHandler(handler: Function): void {
		const backwardsArrow = document.getElementById("backwards-btn");
		if (!backwardsArrow)
			return;
		backwardsArrow.addEventListener('click', () => handler());
	}
	
	public addNextSectionHandler(handler: Function): void {
		const form = document.querySelector('form') as HTMLFormElement;
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			if (!form.checkValidity())
				return;
			const formData = new FormData(form);
			handler(formData);
		});
	}

	private addWorksitesOptionsHandler(): void {
		const input = document.getElementById("worksite-input") as HTMLInputElement;
		const dropdownBtn = document.getElementById("worksite");
		const dropdownBody = document.getElementById("worksite-dropdown-body");
		const dropdownSearchbar = document.getElementById("worksite-search-bar") as HTMLInputElement;
		const worksiteOptions = dropdownBody.querySelectorAll("[data-worksite-option]") as NodeListOf<HTMLButtonElement>;

		['keypress', 'keydown', 'paste'].forEach(inputEvent => {
			input.addEventListener(inputEvent, event => event.preventDefault());
		});

		dropdownBtn.addEventListener("focus", () => {
			dropdownBody.classList.remove("hidden");
			dropdownSearchbar.focus();
			dropdownBtn.classList.add("ring-1");
		});

		dropdownSearchbar.addEventListener("blur", () => {
			dropdownBody.classList.add("hidden");
			dropdownBtn.classList.remove("ring-1");
		});

		dropdownSearchbar.addEventListener("input", () => {
			let inputValue = dropdownSearchbar.value.toLowerCase();
			worksiteOptions.forEach(option => {
				const optionContent = option.textContent.toLowerCase();
				option.style.display = optionContent.includes(inputValue) ? '' : 'none';
			});
		});

		worksiteOptions.forEach(option => {
			option.addEventListener("mouseover", () => {
				input.value = option.value;
				dropdownBtn.innerHTML = option.innerHTML;
				dropdownBtn.classList.remove("border-red-600", "ring-red-600");
				dropdownBtn.classList.add("border-green-600", "ring-green-600");
			});
		});
	}
	
	private generateWorksitesListMarkup(): string {
		let html = ``;
		for (const [key, value] of this.worksites) {
			html += `
				<li role="button" value="${key}" class="block w-full whitespace-nowrap px-2 py-2 text-sm truncate text-neutral-700 hover:bg-slate-100 focus:bg-slate-100  text-left" data-worksite-option>${value}</li>
			`
		};
		return html;
	}
	
	private getOffsetDate(offset: number) : string {
		const today = new Date();
	
		const yyyy = today.getFullYear();
		const mm = today.getMonth() + 1;
		const dd = today.getDate();
		const date = `${yyyy - offset}-${mm < 10 ? '0'+mm : mm}-${dd < 10 ? '0'+dd : dd}`;
	
		return date;
	}
}