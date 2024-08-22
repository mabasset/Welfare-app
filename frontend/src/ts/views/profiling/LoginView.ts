import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {
	
	constructor() {
		super();
	}

	protected override generateMarkup(): string {
		let	html = `
			<dialog data-modal class="max-w-max xs:max-w-xs m-2 xs:mt-10 xs:mx-auto rounded-[1.8rem]">
				<div class="flex flex-col">
					<div class="px-4 pt-4 flex justify-end">
						<button data-close-modal>
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg size-8" viewBox="0 0 16 16">
								<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
							</svg>
						</button>
					</div>
					<form id="password-recovery-form" class="flex flex-col items-center py-4 px-7" novalidate>
						<h2 class="mb-1.5 text-2xl font-semibold">Retrieve Password</h2>
						<p class="text-base text-center leading-5">
							Please enter the email address you provided at registration and press 'Send'. You will receive an email with instructions to follow.
						</p>
						<div class="relative w-full mt-4" data-input-group>
							<label for="email" class="hidden">Email address</label>
							<input id="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" custommaxlength="100"
								class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring" autocomplete="on">
							<section class="text-xs text-rose-600 p-1 absolute"></section>
						</div>
						<button type="submit" class="mt-10 mb-4 flex w-full justify-center rounded-md bg-rose-600 px-4 py-2 shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
							<span class="uppercase text-white font-semibold text-sm sm:text-base text-shadow-md leading-6">Send<span>
						</button>
					</form>
				</div>
			</dialog>
		`
		html += super.generateMarkup();
		return html;
	}

	protected override renderMainMarkup() {
		this.mainElement!.className = "w-full mx-auto sm:max-w-lg p-6 sm:p-12 bg-white rounded";
		this.mainElement!.innerHTML = `
			<main class="w-full mx-auto sm:max-w-lg p-6 sm:p-12 bg-white rounded">
				<h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
				<form id="login-form" class="mt-6" novalidate>
					<div class="relative" data-input-group>
						<label for="login-email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
						<input id="login-email" name="email" type="email" autocomplete="email" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" custommaxlength="100"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring" autocomplete="on">
						<section></section>
					</div>
					<div class="p-2">
					</div>
					<div data-input-group>
						<div class="flex items-center justify-between">
							<label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
							<div class="text-sm">
			  					<a role="button" class="font-semibold text-rose-600 hover:text-rose-800" data-open-modal>Forgot password?</a>
							</div>
						</div>
						<div class="relative">
							<input id="password" name="password" type="password" autocomplete="current-password" required minlength="8" custommaxlength="50" uppercase="1" lowercase="1" digit="1" special="1 _*-+!?,.;:"
								class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
							${this.generatePasswordTogglerMarkup("password")}
							<section></section>
						</div>
					</div>
					<div class="p-2">
					</div>
					<button type="submit" class="mt-2 flex w-full justify-center rounded-md bg-rose-600 px-4 py-2 shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
						<span class="uppercase text-white font-semibold text-sm sm:text-base text-shadow-md leading-6">Enter<span>
					</button>
				</form>
			</div>
		`;
	}

	protected override addEventListeners() {
		super.addEventListeners();
		this.handleModal();
	}

	public addFormSubmitionHandler(handler: (form: HTMLFormElement) => void) {
		this.mainElement?.addEventListener("submit", event => {
			event.preventDefault();
			const form = event.target as HTMLFormElement;
			if (!this.formCheckValidity(form))
				return ;
			handler(form);
		});
	}
}