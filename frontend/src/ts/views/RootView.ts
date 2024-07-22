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
			<header>
			</header>
			<main class="flex flex-col items-center justify-center text-white gap-4 flex-grow px-2">
				<div class="tekne text-center text-4xl lg:text-5xl mt-9">
					Il Benessere a 365 gradi
				</div>
				<span class="my-6 md:my-12 text-center text-2xl md:text-2xl lg:text-4xl">
					<span class="uppercase">
						Per il corpo, per la mente
					</span><br> 
					<span class="inline-flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="inline mt-2 mr-3 bi bi-arrow-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
						</svg>
						<span class="align-middle">tutti i giorni.</span>
					</span>
				</span>
				<div class="container flex justify-center md:mt-8">
					<div class="w-1/3 lg:w-1/4 xl:w-1/12">
						<img src="/static/public/images/smile.svg" alt="smile" class="w-full h-auto">
					</div>
				</div>
				<span class="font-normal text-2xl md:text-2xl lg:text-4xl">
					<span class="font-bold">
						Welfare
					</span>
					is on
				</span>
				<a href="/signup" type="button" class="tekne bg-slate-50 md:mt-10 btn btn-light border-2 border-gray-300 rounded-none text-xl font-semibold px-8 py-2" style="color: #34436c;" data-link>
					Registrati ora
				</a>
				<div class="text-center w-full">
					<span class="text-xl">
						Sei già un membro? Vai al
						<a href="/login" class="link-body-emphasis underline text-white" data-link>
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