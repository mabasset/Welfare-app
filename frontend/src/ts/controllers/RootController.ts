import UserModel from "../models/UserModel";
import RootView from "../views/RootView";
import AController from "./AController";

export default class extends AController<UserModel, RootView> {

	constructor(model: UserModel) {
		const view = new RootView();
		super(model, view);
	}

	public override async renderView(user: user): Promise<void> {
		if (window.location.pathname !== "/")
			throw new Error("", {cause: {status: 404, statusText: "Page Not Found"}});
		this.view.render({user: user});
	}
}