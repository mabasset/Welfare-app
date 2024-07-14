export default class {
	private routes: { [key: string]: Function };

	constructor() {
		this.routes = {};
	}

	public addRoute( path: string, renderView: Function ) : void {
		this.routes[path] = renderView;
	}

	private matchRoute(pathname: string) : Function {
		for (const route in this.routes) {
			const paramNames : string[] = [];
			const regexPath = route.replace(/:([^\/]+)/g, (_, key) => {
				paramNames.push(key);
				return '([^\/]+)';
			});
			const regex = new RegExp(`^${regexPath}$`);
			const match = pathname.match(regex);
			if (!match) continue;
			const params = paramNames.reduce((acc: { [key: string]: string }, paramName, index) => {
				acc[paramName] = match[index + 1];
				return acc;
			}, {});
			return this.routes[route].bind(null, params);
		}
		return this.routes["/"];
	}


	private callRenderingFunction() : void {
		const renderingFunction = this.matchRoute(location.pathname);
		renderingFunction();
	}

	public start() : void {
		window.addEventListener("popstate", this.callRenderingFunction.bind(this));
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