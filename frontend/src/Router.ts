import NotFoundView from "./views/NotFoundView";

export default class {
	private routes: { [key: string]: Function };

	constructor() {

	}

	public addRoute( path: string, renderView: Function ) {
		this.routes[path] = renderView;
	}

	private renderNotFoundView() {
		const view = new NotFoundView();
		view.render();
	}

	private renderView() : void {
		const path = location.pathname.slice(1);
		const renderingFunction = this.routes[path] || this.renderNotFoundView;
		renderingFunction();
	}

	public start() : void {
		window.addEventListener("popstate", this.renderView);
		document.addEventListener("click", (event) : void => {
			const link = (event.target as HTMLElement).closest("[data-link]") as HTMLAnchorElement;
			if (!link) return;
			event.preventDefault();
			history.pushState(null, null, link.href);
			this.renderView();
		});
		this.renderView();
	}
}