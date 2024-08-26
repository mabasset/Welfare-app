import { CustomError } from "../helpers";
import ProfilingModel from "../models/UserModel";
import LoginView from "../views/profiling/LoginView";

export default class {

	private view : LoginView;

	constructor(private model: ProfilingModel) {
		this.view = new LoginView(this.logUserIn.bind(this));
	}

	public async renderView(user: user) {
		if (user.isLogged)
			throw new CustomError(401);
		this.view.render();
	}

	private async logUserIn(formData: FormData) {
		await this.model.login(formData);
		history.pushState(null, "", "/");
		window.dispatchEvent(new Event("popstate"));
	}
}