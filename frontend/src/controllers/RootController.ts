import Controller from "./controller";
import Model from "../models/Model";
import RootView from "../views/RootView";

export default class extends Controller {

	constructor(model: Model) {
		super(model);
	}

	public async renderView(): Promise<void> {
		const data = await this.model.getUserData("me");
		const view = new RootView(data);
		view.render();
	}
}