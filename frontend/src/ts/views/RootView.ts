import AView from "./AView";

export default class extends AView {

	constructor () {
		super();
	}

	private generateHomeMarkup(user: user) {
		return `
			<header class="flex flex-col h-screen">
				<section class="w-full grow-0 flex justify-between items-center py-3 px-4 sm:px-7 text-slate-300 border-b-2">
					<a href="https://www.leonardo.com/">
						<img src="/static/public/images/logo_Leonardo.svg"  alt="logo-leonardo" class="w-auto mx-auto h-10 sm:h-12"/>
					</a>
					<div role="button" class="block sm:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" fill="#ed0909" class="h-11 bi bi-list" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
						</svg>
					</div>
					<div class="hidden sm:flex justify-between items-center min-w-80 text-2xl">
						<div role="button" class="hover:text-black" id="user-icon">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-person-circle" viewBox="0 0 16 16">
								<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
								<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
							</svg>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-14">
							<path stroke-linecap="round" stroke-linejoin="round" d="m9 20.247 6-16.5" />
						</svg>
						<div id="screen-modes" class="flex min-w-20 justify-between">
							<div role="button" class="hover:text-black" id="lightmode-icon">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-sun" viewBox="0 0 16 16">
									<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
								</svg>
							</div>
							<div role="button" class="hover:text-black" id="darkmode-icon">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-moon" viewBox="0 0 16 16">
									<path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
								</svg>
							</div>
						</div>						
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-14">
							<path stroke-linecap="round" stroke-linejoin="round" d="m9 20.247 6-16.5" />
						</svg>
						<div role="button" class="hover:text-black" id="languages-icon">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-translate" viewBox="0 0 16 16">
								<path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
								<path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
							</svg>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-14">
							<path stroke-linecap="round" stroke-linejoin="round" d="m9 20.247 6-16.5" />
						</svg>
						<div role="button" class="hover:text-black" id="search-icon">
							<svg xmlns="http://www.w3.org/2000/svg" fill="#ed0909" class="h-7 bi bi-search" viewBox="0 0 16 16">
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
							</svg>
						</div>
					</div>
				</section>
				<nav id="sidebar" class="flex flex-col gap-y-8 w-full sm:w-80 ps-8 p-6 grow position-fixed z-50 border-r-2 font-semibold bg-slate-50">
					<a class="text-lg uppercase border-l-4 border-rose-500 p-2 ps-6 hover:bg-slate-100">
						Smart Working
					</a>
					<a class="text-lg uppercase border-l-4 border-rose-500 p-2 ps-6 hover:bg-slate-100">
						Supplementary Company Contract
					</a>
					<a class="text-lg uppercase border-l-4 border-rose-500 p-2 ps-6 hover:bg-slate-100">
						Job Posting
					</a>
					<a class="text-lg uppercase border-l-4 border-rose-500 p-2 ps-6 hover:bg-slate-100">
						Training and Development
					</a>
					<a class="text-lg uppercase border-l-4 border-rose-500 p-2 ps-6 hover:bg-slate-100">
						Welfare
					</a>
					<a class="text-lg uppercase border-l-4 border-rose-500 p-2 ps-6 hover:bg-slate-100">
						Calendar
					</a>
					<a class="text-lg uppercase border-l-4 border-rose-500 p-2 ps-6 hover:bg-slate-100">
						Speakyourmind
					</a>
				</nav>
			</header>
			<main>
			</main>
			<footer>
			</footer>
		`
	}

	protected override generateMarkup() {
		return `
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
			${this.generateFooterMarkup()}
		`;
	}
}