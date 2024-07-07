import NotFoundView from "./views/NotFoundView";

export default class {
	private routes: { [key: string]: Function };

	constructor() {
		this.routes = {};
	}

	public addRoute( path: string, renderView: Function ) : void {
		this.routes[path] = renderView;
	}

	private matchRoute(pathname: string) : Function {
		for (const key in this.routes) {
			console.log(key, this.routes[key]);
		}
		return this.routes["/"];
	}

	//const paramNames = [];
	//		const regexPath = route.replace(/:([^\/]+)/g, (_, key) => {
	//			paramNames.push(key);
	//			return '([^\/]+)';
	//		});
	//		const regex = new RegExp(`^${regexPath}$`);
	//		const match = pathname.match(regex);
	//		if (match)
	//		{
	//			const params = paramNames.reduce((acc, paramName, index) => {
	//				acc[paramName] = match[index + 1];
	//				return acc;
	//			}, {});
	//			return { ...config, params };
	//		}

	private renderNotFoundView() : void {
		const view = new NotFoundView();
		view.render();
	}

	private callRenderingFunction() : void {
		const renderingFunction = this.matchRoute(location.pathname)
			|| this.renderNotFoundView;
		renderingFunction();
	}

	public start() : void {
		window.addEventListener("popstate", this.callRenderingFunction);
		document.addEventListener("click", (event) : void => {
			const link = (event.target as HTMLElement).closest("[data-link]") as HTMLAnchorElement;
			if (!link) return;
			event.preventDefault();
			history.pushState(null, null, link.href);
			this.callRenderingFunction();
		});
		this.callRenderingFunction();
	}
}