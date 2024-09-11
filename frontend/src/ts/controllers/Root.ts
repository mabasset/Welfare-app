import UserModel from "../models/User";
import HomeView from "../views/Home";
import WelcomeView from "../views/Welcome";
import ErrorView from "../views/utility/Error";
import LoadingView from "../views/utility/Loading";
import { CustomError } from "../helpers";
import { url } from "inspector";

export default class {
	private	welcomeView = new WelcomeView();
	private	homeView = new HomeView();
	private	errorView = new ErrorView();
	private loadingView = new LoadingView();
	private routes: Record<string, RenderingFunction> = {};

	constructor(
		private userModel: UserModel
	) {}

	public async renderView(user: User, urlParams: Record<string, string>) {
		if (!user.isAuthenticated)
			this.welcomeView.render();
		else
			this.homeView.render(user, urlParams.section);
	}

	public addRoute( path: string, renderingFunction: RenderingFunction) {
		this.routes[path] = renderingFunction;
	}

	public startRouting() {
		const callRenderingFunction = async () => {
			const matchRoute = () => {
				for (const [route, renderingFunction] of Object.entries(this.routes)) {
					const paramKeys = new Array<string>();
					const replacedPath = route.replace(/:([^\/]+)/g, (_, key) => {
						paramKeys.push(key);
						return '([^\/]+)';
					});
					const regex = new RegExp(`^${replacedPath}$`);
					const match = window.location.pathname.match(regex);
					if (!match)
						continue ;
					const urlParams = paramKeys.reduce<Record<string, string>>((acc, key, index) => {
						acc[key] = match[index + 1];
						return acc;
					}, {});
					return {renderingFunction, urlParams};
				};
				const section = window.location.pathname.split("/")[1] || "";
				return {renderingFunction: this.renderView.bind(this), urlParams: {section}};
			};
			this.loadingView.render();
			try {
				const {renderingFunction, urlParams} = matchRoute();
				const user = await this.userModel.getData();
				await renderingFunction(user, urlParams);
			}
			catch(error) {
				console.log(error);
				this.errorView.render(error instanceof CustomError ? error : new CustomError(503));
			}
		};
		window.addEventListener("popstate", callRenderingFunction);
		document.addEventListener("click", (event)  => {
			const link = (event.target as HTMLElement).closest("[data-link]") as HTMLAnchorElement;
			if (!link)
				return ;
			event.preventDefault();
			history.pushState(null, "", link.href);
			callRenderingFunction();
		});
		callRenderingFunction();
	}
}