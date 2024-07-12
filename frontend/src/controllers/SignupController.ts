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
			new UnauthorizedView() : new SignupView(user);
		view.render();
		if (view instanceof SignupView)
			view.addEventHandler(this.handleSubmit.bind(this));
	}

	public async handleSubmit(formData: FormData): Promise<void> {
		for (const [key, value] of formData.entries()) {
			if (typeof value === 'string')
				this.model.setToSessionStorage(key, value);
		}
	}
}