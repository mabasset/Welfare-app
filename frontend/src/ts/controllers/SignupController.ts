import ProfilingModel from "../models/ProfilingModel";
import SignupView from "../views/profiling/SignupView";

export default class {

	private view : SignupView;
	private sessionCookiePrefix = "s_";

	constructor(private model: ProfilingModel) {
		this.view = new SignupView();
	}

	public async renderView(): Promise<void> {
		let user = await this.model.getUserData();
		if (user.isLogged)
			return this.view.renderErrorMarkup(401);
		user = this.model.getUserDataFromCookies(this.sessionCookiePrefix);
		const markupIndex = this.model.getSignupMarkupIndex();
		let worksites: Map<number, string> = new Map();
		if (markupIndex === 1)
			worksites = await this.model.getWorksites();
		this.view.render(user, markupIndex, worksites);
		this.view.addBackwordButtonClickHandler(this.backwordsButtonClickHandler.bind(this));
		this.view.addForwardButtonClickHandler(this.forwardButtonClickHandler.bind(this));
		if (markupIndex === 3)
			this.view.addFormSubmitionHandler(this.formSubmitionHandler.bind(this));
	}

	private async backwordsButtonClickHandler(): Promise<void> {
		const markupIndex = this.model.getSignupMarkupIndex() - 1;
		this.model.setToSessionStorage("signupViewSection", String(markupIndex));
		this.renderView();
	}

	private async forwardButtonClickHandler(formData: FormData): Promise<void> {
		const markupIndex = this.model.getSignupMarkupIndex() + 1;
		this.model.setToSessionStorage("signupViewSection", String(markupIndex));
		for (const [key, value] of formData.entries())
			if (value && typeof value === 'string')
				this.model.setCookie(this.sessionCookiePrefix + key, value);
		this.renderView();
	}

	private async formSubmitionHandler(formData: FormData): Promise<void> {
		for(const [key, value] of formData.entries())
			console.log(key, ":", value);
		await this.model.userSignup(formData);
	}
}