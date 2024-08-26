import { CustomError } from "../../helpers";
import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {

	override mainClassList = "w-full mx-auto sm:max-w-lg p-6 sm:p-12 bg-white rounded";
	
	constructor(
		private logUserIn: (formData: FormData) => Promise<void>
	) {
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
						<button type="button" class="mt-10 mb-4 flex w-full justify-center rounded-md bg-rose-600 px-4 py-2 shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
							<span class="uppercase text-white font-semibold text-sm sm:text-base text-shadow-md leading-6">Send<span>
						</button>
					</form>
				</div>
			</dialog>
		`
		html += super.generateMarkup();
		return html;
	}

	protected override generateMainMarkup() {
		return `
			<h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
			<form id="login-form" class="mt-6" novalidate>
				<div class="relative" data-input-group>
					<label for="login-email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
					<input id="login-email" name="email" type="email" autocomplete="email" required maxlength="100"
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
						<input id="password" name="password" type="password" autocomplete="current-password" required maxlength="100"
							class="truncate w-full px-3 h-10 outline-none rounded border-2 border-slate-400 ring-slate-200 focus:ring">
						${this.generatePasswordTogglerMarkup("password")}
						<section></section>
					</div>
				</div>
				<div class="p-4"></div>
				<button id="login-btn" type="button" class="w-full h-10 text-white px-4 py-2 shadow-md rounded-md bg-rose-400 enabled:bg-rose-600 enabled:hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 group">
					<span class="uppercase font-semibold text-sm sm:text-base text-shadow-md leading-6 group-disabled:hidden">
						Enter
					</span>
					<svg class="animate-spin size-5 mx-auto hidden group-disabled:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</button>
			</form>
		`;
	}

	override addEventListeners() {
		super.addEventListeners();
		document.getElementById("login-btn")?.addEventListener("click", this.handleLoginBtnClick.bind(this));
		//this.handleModal();
	}

	private async handleLoginBtnClick() {
		const form = document.getElementById('login-form') as HTMLFormElement;
		if (!form || !this.formCheckValidity(form))
			return ;
		this.toggleButton("login-btn");
		try {
			await this.logUserIn(new FormData(form));
		}
		catch(error) {
			this.toggleButton("login-btn");
			if (error instanceof CustomError && error.code === 401)
				this.renderAlert("rose", "Wrong email or password.");
			else
				this.renderAlert("rose", "Something went wrong. Please try again later.");
		}
	}
}