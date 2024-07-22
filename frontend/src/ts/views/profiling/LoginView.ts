import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {
	
	constructor() {
		super();
		this.markup = this.generateLayoutMarkup();
	}

	protected override generateMarkup(): string {
		return `
			<div class="card-header tekne fs-4 p-md-3 p-2">
				Login
			</div>
			<div class="card-body py-md-0 py-2">
				<div class="row h-100 row-gap-2 justify-content-around">
					<div class="col-5 d-md-block d-none">
						<img src="" />
					</div>
					<div class="col-md-5">
						<div class="d-flex flex-column h-100 justify-content-around">
							<div class="d-flex flex-column row-gap-3">
								<label for="email" class="display-6 fs-5 fw-normal text-start">
									Indirizzo E-mail
								</label>
								<input id="email" type="text" placeholder="Inserisci la tua mail" class="border-0 border-bottom" />
							</div>
							<div class="d-flex flex-column row-gap-3">
								<label for="password" class="display-6 fs-5 fw-normal text-start">
									Password
								</label>
								<input id="password" type="text" placeholder="Inserisci la tua password" class="border-0 border-bottom" />
							</div>
							<div>
								<a href="/" type="button" class="tekne mt-md-0 mt-4 mb-md-2 btn btn-light border border-secondary border-2 rounded-0 fs-4 px-5 py-1" style="color: #34436c;" data-link>
									Submit
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer p-md-4 p-3">
			</div>
		`
	}

	public addEventHandler(handler : Function) {
		document.addEventListener('click', (event) : void => {
			const input = (event.target as HTMLElement).closest("[data-link]") as HTMLAnchorElement;
			if (!input) return;
			handler();
		})
	}
}