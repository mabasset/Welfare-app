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
		const markupIndexCookie = this.model.getFromSessionStorage("signupViewSection") || "0";
		const markupIndex = Number(markupIndexCookie);
		this.view.render(user, markupIndex);
		this.view.addNextSectionHandler(this.handleSubmit.bind(this));
	}

	public async handleSubmit(formData: FormData): Promise<void> {
		const markupIndexCookie = this.model.getFromSessionStorage("signupViewSection") || "0";
		const markupIndex = Number(markupIndexCookie) + 1;
		this.model.setToSessionStorage("signupViewSection", String(markupIndex));
		for (const [key, value] of formData.entries())
			if (typeof value === 'string')
				this.model.setCookie(this.sessionCookiePrefix + key, value);
		this.renderView();
	}
}