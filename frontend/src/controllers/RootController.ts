import Controller from "./Controller";
import Model from "../models/Model";
import HomeView from "../views/HomeView";
import WelcomeView from "../views/profiling/WelcomeView";

export default class extends Controller {

	constructor(model: Model) {
		super(model);
	}

	public override async renderView(): Promise<void> {
		const user = await this.model.getUserData();
		const view = user.isLogged ?
			new HomeView(user) : new WelcomeView();
		view.render();
	}
}