import Controller from "./Controller";
import Model from "../models/Model";
import UnauthorizedView from "../views/error/UnauthorizedView";
import LoginView from "../views/profiling/LoginView";

export default class extends Controller {

	constructor(model: Model) {
		super(model);
	}

	public override async renderView(): Promise<void> {
		const user = await this.model.getUserData();
		const view = user.isLogged ?
			new UnauthorizedView() : new LoginView();
		view.render();
		view.addEventHandler(this.handleSubmit.bind(this));
	}

	public async handleSubmit(): Promise<void> {
		
	}
}