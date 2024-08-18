import AView from "./AView";

export default class extends AView {

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
			<main class="flex flex-col items-center justify-center text-white gap-4 flex-grow">
				<div class="tekne text-center text-3xl sm:text-4xl md:text-5xl">
					Welfare at 365 degree
				</div>
				<p class="my-6 md:my-9 text-center text-xl sm:text-2xl md:text-3xl">
					<span class="uppercase">
						For the Body, For the Mind
					</span><br> 
					<span class="inline-flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="46" fill="currentColor" class="inline pt-1 bi bi-arrow-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
						</svg>
						<span class="whitespace-nowrap ms-3">
							Every Day.
						</span>
					</span>
				</p>
				<div class="sm:w-full sm:max-w-96 sm:mx-auto">
					<img src="/static/public/images/smile.svg" alt="smile" class="w-auto mx-auto h-24">
					<div class="text-center text-white">
						<span class="tracking-tight leading-9 font-bold text-2xl mt-6">
							Welfare is on
						</span>
					</div>
				</div>
				<a href="/signup" type="button" class="tekne md:text-xl ms-1 md:mt-5 px-5 py-2 text-teal-950 bg-slate-50 border-gray-300 font-semibold" data-link>
					Register Now
				</a>
				<div class="text-center w-full">
					<span class="text-base sm:text-lg md:text-xl">
						Already a member? Go to
						<a href="/login" class="link-body-emphasis underline text-white hover:text-black" data-link>
							Login
						</a>
					</span>
				</div>
			</main>
		`;
	}

	public override render(data: {user: user}) {
		super.render(data);
	}
}