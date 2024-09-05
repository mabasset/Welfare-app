import UserModel from "../models/UserModel";
import ErrorView from "../views/utility/ErrorView";
import LoadingView from "../views/utility/LoadingView";
import { CustomError } from "../helpers";

export default class {
	private	errorView = new ErrorView();
	private loadingView = new LoadingView();
	private routes = new Map<string, Function>();

	constructor (
		private userModel: UserModel,
	) {}

	public addRoute( path: string, renderFunction: Function ) {
		this.routes.set(path, renderFunction);
	}

	private	matchRoute(pathname: string = window.location.pathname) {
		for (const [path, renderFunction] of this.routes.entries())
			if (path === pathname)
				return renderFunction;
		return undefined;
	}


	private async callRenderFunction()  {
		this.loadingView.render();
		const	renderFunction = this.matchRoute();
		if (renderFunction) {
			try {
				const user = await this.userModel.getData();
				await renderFunction(user);
			}
			catch(error) {
				console.log(error);
				const customError = error instanceof CustomError ? error : new CustomError(503);
				this.errorView.render(customError);
			}
		}
		else
			this.errorView.render(new CustomError(404));
	}

	public start() {
		window.addEventListener("popstate", this.callRenderFunction.bind(this));
		document.addEventListener("click", (event)  => {
			const link = (event.target as HTMLElement).closest("[data-link]") as HTMLAnchorElement;
			if (!link)
				return ;
			event.preventDefault();
			history.pushState(null, "", link.href);
			this.callRenderFunction();
		});
		this.callRenderFunction();
	}
}