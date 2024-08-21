import ProfilingModel from "../models/ProfilingModel";
import LoginView from "../views/profiling/LoginView";

export default class {

	private view : LoginView;

	constructor(private model: ProfilingModel) {
		this.view = new LoginView();
	}

	public async renderView(): Promise<void> {
		const user = await this.model.getUserData();
		if (user.isLogged)
			return this.view.renderErrorMarkup(401);
		this.view.render();
		this.view.addFormSubmitionHandler(this.formSubmitionHandler.bind(this));
	}

	private async formSubmitionHandler(form: HTMLFormElement): Promise<void> {
		const formData = new FormData(form);
		if (form.id === "login-form")
			await this.model.login(formData);
		else
			await this.model.retrievePassword(formData);
	}
}