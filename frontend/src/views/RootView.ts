import AProfilingView from "./profiling/AProfilingView";

export default class extends AProfilingView {

	constructor () {
		super();
	}

	private generateHomeMarkup(user: user) : string {
		return `
			<h1>Home</h1>
		`
	}

	private generateWelcomeMarkup() : string {
		return `
			<header class="text-center mt-5">
				<div class="tekne display-3 text-white">
					Il Benessere a 365 gradi
				</div>
			</header>
			<main class="container d-flex flex-column align-items-center justify-content-center text-white row-gap-4 flex-grow-1">
				<span class="my-3 mb-lg-5 text-center fs-3">
					<span class="text-uppercase">
						Per il corpo, per la mente
					</span><br>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="mb-1 me-2 bi bi-arrow-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
						</svg>
						tutti i giorni.
					</span>
				</span>
				<div class="container row justify-content-center">
					<div class="col-4 col-lg-3 col-xl-2">
						<img src="/static/public/images/smile.svg" alt="smile" class="img-fluid">
					</div>
				</div>
				<span class="fw-normal display-6">
					<span class="fw-bold">
						Welfare
					</span>
					is on
				</span>
				<a href="/signup" type="button" class="tekne mt-lg-5 btn btn-light border border-secondary border-2 rounded-0 fs-4 fw-semibold px-5 py-2" style="color: #34436c;" data-link>
					Registrati ora
				</a>
				<div class="text-center w-100>
					<span class="fs-5">
						Sei già un membro? Vai al
						<a href="/login" class="link-body-emphasis text-decoration-none text-decoration-underline text-white" data-link>
							Login
						</a>
					</span>
				</div>
			</main>
			${this.generateFooterMarkup()}
		`;
	}

	public renderHomeMarkup(user: user): void {
		this.markup = this.generateHomeMarkup(user);
		this.parentElement.innerHTML = this.markup;
	}

	public renderWelcomeMarkup(): void {
		this.markup = this.generateWelcomeMarkup();
		super.render();
	}
}