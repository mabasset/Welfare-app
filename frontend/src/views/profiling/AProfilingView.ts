import AView from "../AView";

export default abstract class extends AView {

	constructor() {
		super();
	}

	protected setBodyBackground() : void {
		document.body.classList.add("bg-wf-primary");
	}

	protected generateFooterMarkup() : string {
		return `
			<footer class="fixed-bottom mb-4 mb-lg-5">
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

	protected generateLayoutMarkup() : string {
		return `
			<main class="container vh-100 d-flex flex-column align-items-center justify-content-center text-white">
				<div class="fixed-top text-center mt-5">
					<div class="row justify-content-center">
						<div class="col-3 col-lg-2 col-xl-1">
							<img src="/static/public/images/smile2.svg" alt="smile" class="img-fluid">
						</div>
					</div>
					<a href="/" class="link-body-emphasis text-decoration-none text-white fw-normal fs-3" data-link>
						<span class="fw-bold">
							Welfare
						</span>
						is on
					</a>
				</div>
				<div class="d-flex justify-content-center w-100 h-50">
					<section class="col-lg-10 col-md-11 col-12 card text-bg-light text-center text-dark">
						${this.generateMarkup()}
					</section>
				</div>
			<main>
			${this.generateFooterMarkup()}
		`
	}

	protected abstract generateMarkup(): string

	public override render() : void {
		super.render();
		this.setBodyBackground();
	}

	
}