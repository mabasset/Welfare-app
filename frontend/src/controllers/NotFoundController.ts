import Controller from "./controller";
import Model from "../models/Model";
import NotFoundView from "../views/NotFoundView";

export default class extends Controller {

	constructor(model: Model) {
		super(model);
	}

	public async renderView(): Promise<void> {
		const view = new NotFoundView();
	}
}