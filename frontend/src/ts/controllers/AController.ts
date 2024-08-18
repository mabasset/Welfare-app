import AModel from "../models/AModel";
import AView from "../views/AView";

export default abstract class <TModel extends AModel, TView extends AView> {

	constructor(
		protected model: TModel,
		protected view: TView
	) {};

	abstract renderView(user: user): Promise<void>;

	public	renderErrorPage(error: Error) {
		this.view.render(error);
	}
}