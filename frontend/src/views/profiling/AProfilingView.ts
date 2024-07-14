import AView from "../AView";

export default abstract class extends AView {

	constructor() {
		super();
	}

	protected generateHeaderMarkup() : string {
		return `
			<header class="text-center">
				<div class="d-flex justify-content-center">
					<div class="col-3 col-lg-2 col-xl-1 mt-md-4 mt-1">
						<img src="/static/public/images/smile.svg" alt="smile" class="img-fluid">
					</div>
				</div>
				<a href="/" class="link-body-emphasis text-decoration-none text-white fw-normal fs-3" data-link>
					<span class="fw-bold">
						Welfare
					</span>
					is on
				</a>
			</header>
		`
	}

	protected generateLayoutMarkup() : string {
		return `
			${this.generateHeaderMarkup()}
			<main class="container d-flex justify-content-center my-3">
				<div class="card col-lg-10 col-md-11">
					${this.generateMarkup()}
				</div>
			</main>
			${this.generateFooterMarkup()}
		`
	}

	protected generateFooterMarkup() : string {
		return `
			<footer class="mb-4 mb-lg-5">
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
			</footer>
		`
	}

	protected generateMarkup(): string {
		return`
		`
	}

	public override render(user?: user, markupIndex?: number) : void {
		super.render();
		this.parentElement.classList.add("bg-wf-primary");
	}	
}