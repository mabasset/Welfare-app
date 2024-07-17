import ProfilingModel from "src/models/ProfilingModel";
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
		let worksites: Map<number, string>;
		if (markupIndex === 1)
			worksites = await this.model.getWorksites();
		this.view.render(user, markupIndex, worksites);
		this.view.addPreviousSectionHandler(this.handleBackArrow.bind(this));
		this.view.addNextSectionHandler(this.handleForwardArrow.bind(this));
	}

	private async handleBackArrow(): Promise<void> {
		const markupIndex = this.model.getSignupMarkupIndex() - 1;
		this.model.setToSessionStorage("signupViewSection", String(markupIndex));
		this.renderView();
	}

	private async handleForwardArrow(formData: FormData): Promise<void> {
		const markupIndex = this.model.getSignupMarkupIndex() + 1;
		this.model.setToSessionStorage("signupViewSection", String(markupIndex));
		for (const [key, value] of formData.entries())
			if (typeof value === 'string')
				this.model.setCookie(this.sessionCookiePrefix + key, value);
		this.renderView();
	}
}