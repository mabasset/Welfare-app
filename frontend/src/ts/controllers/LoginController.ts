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
	}
}