import AView from "./AView";

export default class extends AView {

	private user: user | undefined

	constructor () {
		super();
	}

	override render(user: user) {
		this.user = user;
		super.render();
		this.handleSidebar();
		this.handleLanguageChoiceDropdown();
	}

	protected override generateMarkup() {
		return `
			<header class="w-full grow-0 flex justify-between items-center px-4 sm:px-14 text-slate-300 border-b-2 h-20">
				<a href="https://www.leonardo.com/">
					<img src="/static/public/images/logo_Leonardo.svg" alt="logo-leonardo" class="w-auto mx-auto h-10 sm:h-12"/>
				</a>
				<div class="hidden sm:flex justify-between items-center min-w-96 text-2xl h-full">
					<div role="button" class="hover:text-black grow flex justify-center items-center h-full" id="user-icon">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
							<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
						</svg>
					</div>
					|
					<div id="screen-modes" class="flex min-w-20 justify-evenly grow flex justify-center items-center h-full">
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
					|
					<div role="button" class="relative grow flex justify-center items-center h-full" id="languages-dropdown-open-target">
						<div class="flex">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="hover:text-black h-7 bi bi-translate" viewBox="0 0 16 16">
								<path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
								<path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
							</svg>
						</div>
						<dialog id="languages-dropdown" class="top-100 outline-0 text-lg text-center bg-slate-50 top-20 z-20 divide-y divide-gray-200 text-gray-700">
							<div class="py-2 px-8 hover:underline"><a role="button">Ita</a></div>
							<div class="py-2 px-8 hover:underline"><a role="button">Eng</a></div>
						</dialog>
					</div>
					|
					<div role="button" class="hover:text-black grow flex justify-center items-center h-full" id="search-icon">
						<svg xmlns="http://www.w3.org/2000/svg" fill="#ed0909" class="h-7 bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
						</svg>
					</div>
				</div>
				<div id="sidebar-display-target" role="button grow flex justify-center items-center h-full" class="block sm:hidden text-white">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</div>
			</header>
			<main class="flex grow relative">
				<nav id="sidebar" class="absolute md:static flex flex-col divide-y-2 inset-0 overflow-hidden md:!max-w-96 -translate-x-full md:translate-x-0 font-semibold bg-slate-50 z-20 transition-all duration-300 ease-linear">
					<label class="py-4 px-8 select-none text-gray-700 cursor-pointer">
						<div class="flex justify-between items-center m-0 p-0 hover:underline">
							<div class="uppercase text-lg">Welfare Areas</div>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
							</svg>
						</div>
						<input id="welfare-areas-sidebar-option" type="checkbox" class="appearance-none hidden peer">
						<div class="overflow-hidden max-h-0 peer-checked:max-h-96 transition-all delay-0 duration-500 ease-in-out text-left">
							<a class="my-2 block hover:underline" onclick="event.preventDefault();">Physical Wellbeing</a>
							<a class="my-2 block hover:underline" onclick="event.preventDefault();">Economical Wellbeing</a>
							<a class="my-2 block hover:underline" onclick="event.preventDefault();">Psychological Wellbeing</a>
							<a class="my-2 block hover:underline" onclick="event.preventDefault();">Family Wellbeing</a>
						</div>
					</label>
					<a role="button" class="py-4 px-8 select-none text-gray-700 hover:underline uppercase text-lg">Calendar</a>
					<a role="button" class="py-4 px-8 select-none text-gray-700 hover:underline uppercase text-lg">Smart Working</a>
					<a role="button" class="py-4 px-8 select-none text-gray-700 hover:underline uppercase text-lg">Supplementary Company Contract</a>
					<a role="button" class="py-4 px-8 select-none text-gray-700 hover:underline uppercase text-lg">Job Posting</a>
					<a role="button" class="py-4 px-8 select-none text-gray-700 hover:underline uppercase text-lg">Training and Development</a>
					<a role="button" class="py-4 px-8 select-none text-gray-700 hover:underline uppercase text-lg">Speakyourmind</a>
				</nav>
				<section class="grow relative">
					<div class="absolute flex flex-col justify-center items-center h-full w-full">
						<div id="daily-tasks" class="absolute block bg-slate-200 rounded-md shadow-lg md:w-4/5">
							<header class="flex justify-between items-center py-1 px-4">
								<span>daily tasks</span>
								<span>${this.getCurrentDate()}</span>
							</header>
							<div class="overflow-auto flex flex-col bg-white h-60 rounded-md">
								<div class="sticky top-0 z-30 bg-white border-b shadow-sm">
									<div class="grid grid-cols-[3.5rem_auto_auto_auto_auto_auto_auto_auto] text-lg sm:pe-8 text-center divide-x divide-gray-200">
										<div class="hidden sm:block"></div>
										<div class="py-3 flex justify-center items-center">
											<span class="text-md">Mon 
												<span class="font-semibold text-lg">26</span>
											</span>
										</div>
										<div class="py-3 flex justify-center items-center">
											<span class="text-md">Tue 
												<span class="font-semibold text-lg">27</span>
											</span>
										</div>
										<div class="py-3 flex justify-center items-center">
											<span class="text-md">Wed 
												<span class="font-semibold text-lg">28</span>
											</span>
										</div>
										<div class="py-3 flex justify-center items-center">
											<span class="text-md">Thu 
												<span class="font-semibold text-lg">29</span>
											</span>
										</div>
										<div class="py-3 flex justify-center items-center">
											<span class="text-md">Fri 
												<span class="font-semibold text-lg">30</span>
											</span>
										</div>
										<div class="py-3 flex justify-center items-center">
											<span class="text-md">Sat 
												<span class="font-semibold text-lg">31</span>
											</span>
										</div>
										<div class="py-3 flex justify-center items-center">
											<span class="text-md">Sun 
												<span class="font-semibold text-lg">01</span>
											</span>
										</div>
									</div>
								</div>
								<div class="flex flex-1">
									<div class="w-14 sticky"></div>
									<div class="flex-1 grid grid-rows-[repeat(1, minmax(0, 1fr))] grid-cols-[repeat(1, minmax(0, 1fr))]">
										<div class="grid grid-rows-[repeat(18,_minmax(3.5rem,_1fr))] row-start-1 col-start-1 col-end-2 divide-y divide-gray-200">
											<div class="h-7 row-end-1"></div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">6AM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">7AM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">8AM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">9AM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">10AM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">11AM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">12AM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">1PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">2PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">3PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">4PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">5PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">6PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">7PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">8PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">9PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">10PM</div>
											</div>
											<div>
												<div class="w-14 -mt-2.5 -ms-14 z-20 sticky text-gray-400 text-right text-xs pe-2">11PM</div>
											</div>
										</div>
										<div class="grid grid-cols-[repeat(7,_minmax(0,_1fr))] divide-x divide-gray-200">
											<div class="col-start-1"></div>
											<div class="col-start-2"></div>
											<div class="col-start-3"></div>
											<div class="col-start-4"></div>
											<div class="col-start-5"></div>
											<div class="col-start-6"></div>
											<div class="col-start-7"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section >
				</section>
			</main>
			<footer>
			</footer>
		`;
	}

	private handleSidebar() {
		const trigger = document.getElementById('sidebar-display-target');
		const sidebar = document.getElementById('sidebar');
		if (!trigger || !sidebar)
			return ;
		trigger.addEventListener('click', () => sidebar.classList.toggle('!translate-x-0'));
	}

	private handleLanguageChoiceDropdown() {
		const trigger = document.getElementById('languages-dropdown-open-target');
		const dropdown = document.getElementById('languages-dropdown') as HTMLDialogElement;
		if (!trigger || !dropdown)
			return ;
		trigger.addEventListener("click", () => {
			!dropdown.classList.contains('active') ? dropdown.show() : dropdown.close();
			dropdown.classList.toggle('active');
		});
	}

	private getCurrentDate() {
		const now = new Date();
		const day = now.getDate();
		const month = now.getMonth();
		const year = now.getFullYear();
		return `${day < 10 ? '0' + day : day} / ${month < 10 ? '0' + month : month} / ${year}`;
	}
}
