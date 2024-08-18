import UserModel from "../models/UserModel";
import SignupView from "../views/profiling/SignupView";
import AController from "./AController";

export default class extends AController<UserModel, SignupView> {

	constructor(model: UserModel) {
		const view = new SignupView();
		super(model, view);
	}

	public async renderView(): Promise<void> {
		let	user = this.getUserData();
		if (!user)
			return ;
		else if (user.isLogged)
			return this.view.renderErrorPage(401);
		const worksites = await this.model.getWorksiteOptions();
		user = this.model.getUserDataFromSessionStrorage();
		this.view.render({user, worksites});
	}

	private async registrationFormSubmitionHandler(form: HTMLFormElement): Promise<void> {
		const formData = new FormData(form);
		for(const [key, value] of formData.entries())
			console.log(key, ":", value);
		await this.model.signup(formData);
	}
}