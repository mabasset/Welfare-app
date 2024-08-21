import ProfilingModel from "../models/ProfilingModel";
import SignupView from "../views/profiling/SignupView";

export default class {

	private view : SignupView;

	constructor(private model: ProfilingModel) {
		this.view = new SignupView();
	}

	public async renderView(): Promise<void> {
		let user: user;
		try {
			user = await this.model.getUserData();
		}
		catch(error) {
			return console.log(error);
		}
		if (user.isLogged)
			return this.view.renderErrorMarkup(401);
		user = this.model.getUserDataFromCookies();
		const markupIndex = this.model.getSignupViewSectionMarkupIndex();
		let worksites: Map<number, string> = new Map();
		if (markupIndex === 1)
			worksites = await this.model.getWorksiteOptions();
		this.view.render(user, markupIndex, worksites);
		this.view.addBackwordButtonClickHandler(this.backwordsButtonClickHandler.bind(this));
		this.view.addForwardButtonClickHandler(this.forwardButtonClickHandler.bind(this));
		if (markupIndex === 3)
			this.view.addFormSubmitionHandler(this.formSubmitionHandler.bind(this));
	}

	private async backwordsButtonClickHandler(): Promise<void> {
		this.model.modifySignupViewSectionMarkupIndex(-1);
		this.renderView();
	}

	private async forwardButtonClickHandler(formData: FormData): Promise<void> {
		this.model.modifySignupViewSectionMarkupIndex(1);
		this.model.saveFormDataAsSessionCookies(formData);
		this.renderView();
	}

	private async formSubmitionHandler(form: HTMLFormElement): Promise<void> {
		const formData = new FormData(form);
		for(const [key, value] of formData.entries())
			console.log(key, ":", value);
		await this.model.signup(formData);
	}
}