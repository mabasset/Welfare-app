import { CustomError } from "../helpers";
import ProfilingModel from "../models/UserModel";
import LoginView from "../views/profiling/LoginView";

export default class {

	private view : LoginView;

	constructor(private model: ProfilingModel) {
		this.view = new LoginView();
	}

	public async renderView(user: user) {
		if (user.isLogged)
			throw new CustomError(401);
		this.view.render();
		this.view.addFormSubmitionHandler(this.formSubmitionHandler.bind(this));
	}

	private async formSubmitionHandler(form: HTMLFormElement) {
		const formData = new FormData(form);
		if (form.id === "login-form")
			await this.model.login(formData);
		else
			await this.model.retrievePassword(formData);
	}
}