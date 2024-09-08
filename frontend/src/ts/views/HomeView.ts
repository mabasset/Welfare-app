import { getOffsetDate } from "../helpers";
import AView from "./AView";

export default class extends AView {

	override documentTitle = "Home Page";
	private user: User | undefined
	override headerClassName = "w-full grow-0 flex justify-between items-center px-6 sm:px-12 text-white border-b-2 h-20";
	override mainClassName = "flex grow relative";
	override footerClassName = "border-t-2 py-6 px-4 sm:px-6 text-white";

	constructor () {
		super();
	}

	override render(user: User) {
		this.user = user;
		super.render();
	}

	override generateHeaderMarkup() {
		return `
			<a href="/" data-link>
				<div class="hidden md:flex">
					<div class="me-3">
						<p class="text-3xl"><b>Welfare</b> is on</p>
					</div>
					<div class="">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-toggle-on size-10" viewBox="0 0 16 16">
							<path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
						</svg>
					</div>
				</div>
				<img src="/static/public/images/smile.svg" alt="smile" class="md:hidden size-20">
			</a>
			<div class="hidden sm:flex justify-between items-center min-w-96 text-2xl h-full">
				<div class="relative grow flex justify-center items-center h-full">
					<button class="hover:text-black" data-toggle-dropdown="profile">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
							<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
						</svg>
					</button>
					<dialog class="top-100 w-full outline-0 text-lg text-center bg-slate-50 top-20 z-20 divide-y divide-gray-200 text-gray-700" data-dropdown="profile">
						<div class="hover:underline">
							<a role="button">
								Logout
							</a>
						</div>
					</dialog>
				</div>
				|
				<div id="screen-modes" class="flex min-w-20 justify-evenly grow items-center h-full">
					<button class="text-white dark:text-black" id="lightmode-icon">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-sun" viewBox="0 0 16 16">
							<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
						</svg>
					</button>
					<button class="text-black dark:text-white" id="darkmode-icon">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-moon" viewBox="0 0 16 16">
							<path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
						</svg>
					</button>
				</div>
				|
				<div role="button" class="relative grow flex justify-center items-center h-full">
					<button class="hover:text-black flex" data-toggle-dropdown="language">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-7 bi bi-translate" viewBox="0 0 16 16">
							<path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
							<path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					</button>
					<dialog class="top-100 outline-0 text-lg text-center bg-slate-50 top-20 z-20 divide-y divide-gray-200 text-gray-700" data-dropdown="language">
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
		`;
	}

	override generateMainMarkup() {
		return `
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
							<span>${getOffsetDate(0)}</span>
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
		`;
	}

	override generateFooterMarkup() {
		return `
			<div class="flex mt-6 flex-col">
				<nav class="flex">
					<ul class="flex items-center justify-evenly grow text-xs">
						<li class="">
							<a href="https://www.leonardo.com/en/privacy-policy" target="_blank" class="text-white hover:text-black no-underline hover:underline select-none" data-open-window="privacy-policy">
								Privacy Policy
							</a>
						</li>
						<li class="">
							<a href="https://www.leonardo.com/en/legal-notice" target="_blank" class="text-white hover:text-black no-underline hover:underline select-none" data-open-window="legal-notice">
								Legal Notice
							</a>
						</li>
						<li class="">
							<a href="https://www.leonardo.com/en/cookie-policy" target="_blank" class="text-white hover:text-black no-underline hover:underline select-none" data-open-window="cookie-policy">
								Cookie Policy
							</a>
						</li>
					</ul>
				</nav>
				<nav class="flex border-t-2 w-full mt-5 pt-6">
					<ul class="flex items-center justify-evenly grow">
						<li>
							<a class="" href="https://twitter.com/Leonardo_live" target="_blank" title="Twitter" aria-label="Leonardo's Twitter page link" data-open-window="Twitter">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-twitter-x size-5" viewBox="0 0 16 16">
									<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
								</svg>
							</a>
						</li>
						<li>
							<a class="" href="https://www.linkedin.com/company/leonardo_company" target="_blank" title="LinkedIn" aria-label="Leonardo's LinkedIn page link" data-open-window="LinkedIn">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-linkedin size-5" viewBox="0 0 16 16">
									<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
								</svg>
							</a>
						</li>
						<li>
							<a class="" href="https://www.youtube.com/c/LeonardoCompany" target="_blank" title="YouTube" aria-label="Leonardo's YouTube page link" data-open-window="YouTube">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-youtube size-5" viewBox="0 0 16 16">
									<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
								</svg>
							</a>
						</li>
						<li>
							<a class="" href="https://www.instagram.com/leonardo_company/" target="_blank" title="Instagram" aria-label="Leonardo's Instagram page link" data-open-window="Instagram">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-instagram size-5" viewBox="0 0 16 16">
								  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
								</svg>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		`;
	}

	override addEventHandlers() {
		const handleSidebar = () =>
			document.getElementById('sidebar')?.classList.toggle('!translate-x-0');
		
		document.getElementById('sidebar-display-target')?.addEventListener('click', handleSidebar);
		super.addEventHandlers();
	}
}
