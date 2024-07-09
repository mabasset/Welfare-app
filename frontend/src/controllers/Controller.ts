import Model from "../models/Model";

export default abstract class {

	constructor(
		protected model: Model
	) { }

	public abstract renderView(params?: { [key: string]: string }) : void
}