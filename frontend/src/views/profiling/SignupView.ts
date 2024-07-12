import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {
	
	constructor(
		private user: user
	) {
		super();
		this.markup = this.generateLayoutMarkup();
	}

	protected override generateMarkup(): string {
		return `
			<form class="needs-validation" novalidate>
				<div class="card-header tekne fs-5 display-6 p-md-3 p-3 text-center">
					Dati personali
				</div>
				<div class="card-body d-flex flex-column justify-content-center py-md-5 px-md-5 row-gap-md-5 row-gap-2">
					<div class="row row-gap-2">
						<div class="col-md-6">
							<div class="form-floating">
								<input type="text" class="form-control" name="name" id="name" value="${this.user.name || ''}" placeholder="random" required>
								<label for="name">Nome</label>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-floating">
								<input type="text" class="form-control" name="surname" id="surname" value="${this.user.surname || ''}" placeholder="random" required>
								<label for="surname">Cognome</label>
							</div>
						</div>
					</div>
					<div class="row row-gap-2">
						<div class="col-md-6">
							<div class="form-floating">
								<input type="date" class="form-control" name="birthday" id="birthday" value="${this.user.birthday || ''}" required>
								<label for="birthday">Data di nascita</label>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-floating">
								<select class="form-select" name="isMarried" id="marital-status" aria-label="What's your marital status">
									<option value="0" ${this.user.isMarried === "0" ? 'selected' : ''}>celibe</option>
									<option value="1" ${this.user.isMarried === "1" ? 'selected' : ''}>nubile</option>
								</select>
								<label for="marital-status">Stato civile</label>
							</div>
						</div>
					</div>
					<div class="row row-gap-2">
						<div class="col-md-6">
							<div class="form-floating">
								<select class="form-select" name="childrens" id="childrens" aria-label="Have any childrens">
									<option value="0" ${this.user.childrens === "0" ? 'selected' : ''}>No</option>
									<option value="1" ${this.user.childrens === "1" ? 'selected' : ''}>Si</option>
								</select>
								<label for="childrens">Figli</label>
							</div>
						</div>
						<div class="col-md-6">
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
				<div class="card-footer tekne fs-6 text-secondary px-md-5 px-3 py-md-2 py-1">
					<div class="d-flex w-100 justify-content-between align-items-center">
						<span role="button">
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
							</svg>
						</span>
						<span>
							1 / 5
						</span>
						<label role="button">
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
							</svg>
							<input type="submit" class="d-none" />
						</label>
					</div>
				</div>
			</form>
		`
	}

	public addEventHandler(handler : Function) {
		const form = document.querySelector('form') as HTMLFormElement;
		form.addEventListener('submit', (event) => {
			event.preventDefault()
			form.classList.add('was-validated')
			if (!form.checkValidity())
				return;
            const formData = new FormData(form);
			handler(formData);
        });
	}
}