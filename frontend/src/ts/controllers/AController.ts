import AView from "../views/AView";

export default abstract class <TView extends AView> {

	constructor(
		protected view: TView
	) {};

	abstract renderView(user: user): Promise<void>;
}