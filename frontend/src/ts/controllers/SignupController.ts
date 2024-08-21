import { CustomError } from "../helpers";
import UserModel from "../models/UserModel";
import SignupView from "../views/profiling/SignupView";

export default class {
	private view = new SignupView();

	constructor(
		private model: UserModel
	) {}

	public async renderView(user: user) {
		if (user.isLogged)
			throw new CustomError(401);
		const worksites = await this.model.getWorksiteOptions();
		const sessionData = this.model.getUserDataFromSessionStrorage();
		this.view.render(sessionData, worksites);
		this.view.addForwardButtonClickHandler(this.model.setUserDataToSessionStrorage.bind(this.model));
		this.view.addFormSubmitionHandler(this.handleFormSubmition.bind(this));
	}

	private handleForwardButtonClick() {
		
	}

	private async handleFormSubmition(form: HTMLFormElement): Promise<void> {
		const formData = new FormData(form);
		for(const [key, value] of formData.entries())
			console.log(key, ":", value);
		await this.model.signup(formData);
	}
}