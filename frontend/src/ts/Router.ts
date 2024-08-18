import AController from "./controllers/AController";
import RootController from "./controllers/RootController";
import AModel from "./models/AModel";
import UserModel from "./models/UserModel";
import AView from "./views/AView";

export default class {
	private routes = new Map<string, AController<AModel, AView>>();

	constructor(
		private rootController: RootController,
		private userModel: UserModel
	) {}

	public addRoute( path: string, controller: AController<AModel, AView> ) {
		this.routes.set(path, controller);
	}

	private matchRoute(pathname: string = window.location.pathname) {
		//for (const route in this.routes) {
		//	const paramNames : string[] = [];
		//	const regexPath = route.replace(/:([^\/]+)/g, (_, key) => {
		//		paramNames.push(key);
		//		return '([^\/]+)';
		//	});
		//	const regex = new RegExp(`^${regexPath}$`);
		//	const match = pathname.match(regex);
		//	if (!match) continue;
		//	const params = paramNames.reduce((acc: { [key: string]: string }, paramName, index) => {
		//		acc[paramName] = match[index + 1];
		//		return acc;
		//	}, {});
		//	return this.routes[route].bind(null, params);
		//}
		return this.rootController;
	}


	private async callRenderingFunction()  {
		const	controller = this.matchRoute() || this.rootController;
		try {
			const user = await this.userModel.getUserData();
			await controller.renderView(user);
		}
		catch(error) {
			if (error instanceof Error)
				controller.renderErrorPage(error);
		}
	}

	public start()  {
		window.addEventListener("popstate", this.callRenderingFunction.bind(this));
		document.addEventListener("click", (event)  => {
			const link = (event.target as HTMLElement).closest("[data-link]") as HTMLAnchorElement;
			if (!link) return;
			event.preventDefault();
			history.pushState(null, "", link.href);
			this.callRenderingFunction();
		});
		this.callRenderingFunction();
	}
}