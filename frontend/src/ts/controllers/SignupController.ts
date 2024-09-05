import UserModel from "../models/UserModel";
import SignupView from "../views/profiling/SignupView";
import { CustomError } from "../helpers";

export default class {
	private view: SignupView;

	constructor(
		private userModel: UserModel
	) {
		this.view = new SignupView(
			this.userModel.setDataToSessionStrorage.bind(this.userModel),
			this.registerUser.bind(this)
		);
	}

	public async renderView(user: User) {
		if (user.isAuthenticated)
			throw new CustomError(401);
		const sessionData = this.userModel.getDataFromSessionStrorage();
		const worksites = await this.userModel.getWorksites();
		this.view.render(sessionData, worksites);
	}

	private async registerUser(formData: FormData) {
		await this.userModel.signup(formData);
		history.pushState(null, "", "/login");
		window.dispatchEvent(new Event("popstate"));
	}
}