import UserModel from "../models/UserModel";
import RootView from "../views/RootView";

export default class {
	private	view = new RootView();

	constructor(
		private model: UserModel
	) {}

	public async renderView(user: user) {
		this.view.render({user: user});
	}
}