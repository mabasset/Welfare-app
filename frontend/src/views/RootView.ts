import View from "./View";

export default class extends View {

	constructor (user: user) {
		const parentElement = document.querySelector("body");
		super(parentElement);
		this.markup = user.isLogged ?
			this.generateHomeMarkup() : this.generateWelcomeMarkup();
	}

	private generateHomeMarkup() : string {
		return `
			<h1>HomePage<h1>
		`;
	}

	private generateWelcomeMarkup() : string {
		return `
			<main class="container vh-100 d-flex flex-column align-items-center justify-content-md-center text-white row-gap-4 mt-md-0 mt-5">
				<span class="tekne display-3 text-center mt-md-0 mt-5">
					Il Benessere a 365 gradi
				</span>
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
						<img src="/static/public/images/smile2.svg" alt="smile" class="img-fluid">
					</div>
				</div>
				<span class="fw-normal display-6">
					<span class="fw-bold">
						Welfare
					</span>
					is on
				</span>
				<a href="/signup" type="button" class="tekne mb-lg-5 mt-1 btn btn-light border border-secondary border-2 rounded-0 fs-4 fw-semibold px-5 py-2" style="color: #34436c;" data-link>
					Registrati ora
				</a>
				<div class="fixed-bottom text-center w-100 mb-4 mb-lg-5">
					<span class="fs-5">
						Sei già un membro? Vai al
						<a href="/login" class="link-body-emphasis text-decoration-none text-decoration-underline text-white" data-link>
							Login
						</a>
					</span>
					<nav class="mt-3">
						<ul class="list-group list-group-horizontal d-flex flex-wrap justify-content-center border-0">
							<li class="list-group-item bg-transparent border-0 py-0 px-2">
								<a href="" class="text-white link-body-emphasis text-decoration-none">
									Privacy Policy
								</a>
							</li>
							<li class="list-group-item bg-transparent border-0 border-start py-0 px-2">
								<a href="" class="text-white link-body-emphasis text-decoration-none">
									Cookie Policy
								</a>
							</li>
							<li class="list-group-item bg-transparent border-0 border-start py-0 px-2">
								<a href="" class="text-white link-body-emphasis text-decoration-none">
									Preference Cookie
								</a>
							</li>
							<li class="list-group-item bg-transparent border-0 border-start py-0 px-2">
								<a href="" class="text-white link-body-emphasis text-decoration-none">
									Nota legale
								</a>
							</li>
							<li class="list-group-item bg-transparent border-0 border-start py-0 px-2">
								<a href="" class="text-white link-body-emphasis text-decoration-none">
									Sitemap
								</a>
							</li>
							<li class="list-group-item bg-transparent border-0 border-start py-0 px-2">
								<a href="" class="text-white link-body-emphasis text-decoration-none">
									CERT
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</main>
		`;
	}
}