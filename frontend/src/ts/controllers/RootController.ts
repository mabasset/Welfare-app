import UserModel from "../models/UserModel";
import RootView from "../views/RootView";
import AController from "./AController";

export default class extends AController<UserModel, RootView> {

	constructor(model: UserModel) {
		const view = new RootView();
		super(model, view);
	}

	public override async renderView(user: user): Promise<void> {
		if (user.isLogged)
			
	}
}