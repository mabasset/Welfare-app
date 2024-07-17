import AProfilingView from "./AProfilingView";

enum markupSection {
	PersonalData,
	Location,
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
			case markupSection.PersonalData:
				markup = this.generatePersonalDataMarkup();
				break;
			case markupSection.Location:
				markup = this.generateLocationMarkup();
				break;
			case markupSection.Welfare:
				markup = this.generateWelfareMarkup();
				break;
			default:
				break;
		}
		return markup;
	}

	private generatePersonalDataMarkup(): string {
		return `
			<form class="needs-validation" novalidate>
				<div class="card-header tekne fs-5 display-6 p-md-3 p-3 text-center">
					Dati personali
				</div>
				<div class="card-body d-flex flex-column justify-content-center py-md-5 px-md-5 row-gap-md-5 row-gap-2">
					<div class="row row-gap-md-5 row-gap-2">
						<div class="col-md-6">
							<div class="form-floating">
								<input type="text" class="form-control" name="name" id="name" value="${this.user.name || ''}" placeholder="" required>
								<label for="name">Nome</label>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-floating">
								<input type="text" class="form-control" name="surname" id="surname" value="${this.user.surname || ''}" placeholder="" required>
								<label for="surname">Cognome</label>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-floating">
								<input type="date" class="form-control" name="birthday" id="birthday" value="${this.user.birthday || ''}" min="${this.getOffsetDate(100)}" max="${this.getOffsetDate(15)}" required>
								<label for="birthday">Data di nascita</label>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-floating">
								<select class="form-select" name="interest" id="interest" aria-label="What's your interest">
									<option value="0" ${this.user.interest === "0" ? 'selected' : ''}>Sport</option>
									<option value="1" ${this.user.interest === "1" ? 'selected' : ''}>Lettura</option>
									<option value="2" ${this.user.interest === "2" ? 'selected' : ''}>Relax</option>
									<option value="3" ${this.user.interest === "3" ? 'selected' : ''}>Relax</option>
									<option value="4" ${this.user.interest === "4" ? 'selected' : ''}>Altro...</option>
								</select>
								<label for="interest">Interessi</label>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-floating">
								<select class="form-select" name="isMarried" id="marital-status" aria-label="What's your marital status">
									<option value="0" ${this.user.isMarried === "0" ? 'selected' : ''}>Celibe</option>
									<option value="1" ${this.user.isMarried === "1" ? 'selected' : ''}>Nubile</option>
								</select>
								<label for="marital-status">Stato civile</label>
							</div>
						</div>
						<div class="col-md-4 col-6 pe-md-3 pe-1">
							<div class="form-floating">
								<select class="form-select" name="childrens" id="childrens" aria-label="Have any childrens">
									<option value="0" ${this.user.childrens === "0" ? 'selected' : ''}>No</option>
									<option value="1" ${this.user.childrens === "1" ? 'selected' : ''}>Si</option>
								</select>
								<label for="childrens">Figli</label>
							</div>
						</div>
						<div class="col-md-4 col-6 ps-md-3 ps-1">
							<div class="form-floating">
								<select class="form-select" name="elderlyParents" id="elderly-parents" aria-label="Have elderly parents">
									<option value="0" ${this.user.elderlyParents === "0" ? 'selected' : ''}>No</option>
									<option value="1" ${this.user.elderlyParents === "1" ? 'selected' : ''}>Si</option>
								</select>
								<label for="elderly-parents">Genitori anziani</label>
							</div>
						</div>
					</div>
				</div>
				${this.generateCardFooterMarkup()}
			</form>
		`
	}

	private generateLocationMarkup(): string {
		return `
			<form>
				<div class="card-header tekne fs-5 display-6 p-md-3 p-3 text-center">
					Localizzazione
				</div>
				<div class="card-body d-flex flex-column justify-content-center py-md-5 px-md-5 row-gap-md-5 row-gap-2">
					<div class="row row-gap-md-5 row-gap-2 justify-content-center">
						<div class="col-md-8 col-12">
							<div class="form-floating">
								<input type="text" class="form-control" name="street" id="street" value="${this.user.street || ''}" placeholder="" required>
								<label for="street">Indirizzo</label>
							</div>
						</div>
						<div class="col-md-4 col-6 pe-md-3 pe-1">
							<div class="form-floating">
								<input type="text" class="form-control" name="houseNumber" id="houseNumber" value="${this.user.houseNumber || ''}" placeholder="">
								<label for="houseNumber">N. civico</label>
							</div>
						</div>
						<div class="col-md-3 col-6 ps-md-3 ps-1">
							<div class="form-floating">
								<input type="text" class="form-control" name="postalCode" id="postalCode" value="${this.user.postalCode || ''}" placeholder="" required>
								<label for="postalCode">CAP</label>
							</div>
						</div>
						<div class="col-md-5 col-6 pe-md-3 pe-1">
							<div class="form-floating">
								<input type="text" class="form-control" name="city" id="city" value="${this.user.city || ''}" placeholder="" required>
								<label for="city">Città</label>
							</div>
						</div>
						<div class="col-md-4 col-6 ps-md-3 ps-1">
							<div class="form-floating">
								<input type="text" class="form-control" name="country" id="country" value="${this.user.country || ''}" placeholder="" required>
								<label for="country">Paese</label>
							</div>
						</div>
						<div class="col-12">
							<div class="form-floating">
								<input type="search" class="form-control" id="worksite" value="${this.worksites.get(Number(this.user.worksite)) || ''}" placeholder="" autocomplete="off" required>
								<input type="hidden" id="hiddenWorksite" name="worksite" value="${this.user.worksite || ''}">
								<div id="worksites-list" class="d-none w-100 position-absolute list-group z-1 overflow-auto" style="max-height: 140px;">
									${this.generateWorksitesListMarkup()}
								</div>
								<label for="worksite">Sede lavorativa</label>
							</div>
						</div>
					</div>
				</div>
				${this.generateCardFooterMarkup()}
			</form>
		`
	}

	private generateWelfareMarkup(): string {
		return `
			<form>
				<div class="card-header tekne fs-5 display-6 p-md-3 p-3 text-center">
					Opzioni Welfare
				</div>
				<div class="card-body d-flex flex-column justify-content-center py-md-5 px-md-5 row-gap-md-5 row-gap-4">
					<div class="row g-md-3 row-gap-2 row-cols-1 row-cols-md-4">
						<div class="col">
							<div class="bg-wf-physical w-100">Benessere Fisico</div>
						</div>
						<div class="col">
							<div class="bg-wf-economic w-100">Benessere Economico</div>
						</div>
						<div class="col">
							<div class="bg-wf-psychological w-100">Benessere Psicologico</div>
						</div>
						<div class="col">
							<div class="bg-wf-family w-100">Benessere Familiare</div>
						</div>
					</div>
				</div>
				${this.generateCardFooterMarkup()}
			</form>
		`
	}

	private generateCardFooterMarkup(): string {
		return `
			<div class="card-footer tekne fs-6 text-secondary px-md-5 px-3 py-md-2 py-1">
				<div class="d-flex w-100 justify-content-between align-items-center">
					<div class="col text-start">
						<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" id="backwardsArrow" role="button" class="${this.markupIndex === 0 ? 'd-none' : ''} bi bi-arrow-left" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
						</svg>
					</div>
					<div class="col text-center">
						${this.markupIndex + 1} / 5
					</div>
					<label class="col text-end">
						<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" role="button" fill="currentColor" class="${this.markupIndex === 3	? 'd-none' : ''}bi bi-arrow-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
						</svg>
						<input type="submit" class="d-none" />
					</label>
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
		this.addWorksitesOptionsHandler();
	}
	
	public addPreviousSectionHandler(handler: Function): void {
		const backwardsArrow = document.getElementById("backwardsArrow");
		if (!backwardsArrow)
			return;
		backwardsArrow.addEventListener('click', () => handler());
	}
	
	public addNextSectionHandler(handler: Function): void {
		const form = document.querySelector('form') as HTMLFormElement;
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			form.classList.add('was-validated')
			if (!form.checkValidity())
				return;
			const formData = new FormData(form);
			handler(formData);
		});
	}

	private addWorksitesOptionsHandler(): void {
		const searchBarInput = document.getElementById('worksite') as HTMLInputElement;
		const searchBarHiddenInput = document.getElementById('hiddenWorksite') as HTMLInputElement;
		const worsitesOptionsContainer = document.getElementById('worksites-list');
		
		if (!searchBarInput || !searchBarHiddenInput || !worsitesOptionsContainer)
			return;
		const worksiteOptions = worsitesOptionsContainer.querySelectorAll("[data-searchbar-option]") as NodeListOf<HTMLButtonElement>;

		["focus", "blur"].forEach(event => 
			searchBarInput.addEventListener(event, () =>
				worsitesOptionsContainer.classList.toggle('d-none'))
		);
	
		searchBarInput.addEventListener('input', () => {
        	let inputValue = searchBarInput.value.toLowerCase();
			worksiteOptions.forEach(option => {
				const optionContent = option.textContent.toLowerCase();
				option.style.display = optionContent.includes(inputValue) ? '' : 'none';
			});
		});

		worksiteOptions.forEach(option => {
			option.addEventListener("mouseover", () => {
				searchBarInput.value = option.innerText;
				searchBarHiddenInput.value = option.value;
			});
		});
	}
	
	private generateWorksitesListMarkup(): string {
		let html = ``;
		for (const [key, value] of this.worksites) {
			html += `
				<button type="button" value="${key}" class="list-group-item list-group-item-action" data-searchbar-option>${value}</button>
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