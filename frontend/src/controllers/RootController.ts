import Model from "../models/Model";
import RootView from "../views/RootView";

export default class {

	private view: RootView;

	constructor(private model: Model) {
		this.view = new RootView();
	}

	public async renderView(): Promise<void> {
		const user = await this.model.getUserData();
		if (location.pathname !== "/")
			this.view.renderErrorMarkup(404);
		else if (user.isLogged)
			this.view.renderHomeMarkup(user);
		else
			this.view.renderWelcomeMarkup();
	}
}