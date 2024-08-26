import { CustomError } from "../helpers";
import UserModel from "../models/UserModel";
import SignupView from "../views/profiling/SignupView";

export default class {
	private view: SignupView;

	constructor(
		private model: UserModel
	) {
		this.view = new SignupView(
			this.model.setUserDataToSessionStrorage.bind(this.model),
			this.registerUser.bind(this)
		);
	}

	public async renderView(user: user) {
		if (user.isLogged)
			throw new CustomError(401);
		const sessionData = this.model.getUserDataFromSessionStrorage();
		const worksites = await this.model.getWorksiteOptions();
		this.view.render(sessionData, worksites);
	}

	private async registerUser(formData: FormData) {
		await this.model.signup(formData);
		history.pushState(null, "", "/");
		window.dispatchEvent(new Event("popstate"));
	}
}