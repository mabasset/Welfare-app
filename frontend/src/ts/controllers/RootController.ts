import UserModel from "../models/UserModel";
import HomeView from "../views/HomeView";
import WelcomeView from "../views/WelcomeView";

export default class {
	private	welcomeView = new WelcomeView();
	private	homeView = new HomeView();

	constructor(
		private userModel: UserModel
	) {}

	public async renderView(user: user) {
		if (!user.isAuthenticated)
			this.welcomeView.render();
		else
			this.homeView.render(user);
	}
}