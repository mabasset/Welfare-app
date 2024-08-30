import ProfilingModel from "../models/UserModel";
import LoginView from "../views/profiling/LoginView";
import { CustomError } from "../helpers";

export default class {

	private view : LoginView;

	constructor(
		private userModel: ProfilingModel
	) {
		this.view = new LoginView(
			userModel.retrievePassword.bind(userModel),
			this.logUserIn.bind(this)
		);
	}

	public async renderView(user: User) {
		if (user.isAuthenticated)
			throw new CustomError(401);
		this.view.render();
	}

	private async logUserIn(formData: FormData) {
		await this.userModel.login(formData);
		history.pushState(null, "", "/");
		window.dispatchEvent(new Event("popstate"));
	}
}