import Controller from "./Controller";
import Model from "../models/Model";
import UnauthorizedView from "../views/error/UnauthorizedView";
import SignupView from "../views/profiling/SignupView";

export default class extends Controller {

	constructor(model: Model) {
		super(model);
	}

	public override async renderView(): Promise<void> {
		const user = await this.model.getUserData();
		const view = user.isLogged ?
			new UnauthorizedView() : new SignupView();
		view.render();
	}
}