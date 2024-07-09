import Controller from "./Controller";
import Model from "../models/Model";
import RootView from "../views/RootView";

export default class extends Controller {

	constructor(model: Model) {
		super(model);
	}

	public override async renderView(): Promise<void> {
		const user = await this.model.getUserData("me");
		const view = new RootView(user);
		view.render();
	}
}