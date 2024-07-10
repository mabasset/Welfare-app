import AProfilingView from "./AProfilingView";

export default class extends AProfilingView {
	
	constructor() {
		super();
		this.markup = this.generateLayoutMarkup();
	}

	protected override generateMarkup(): string {
		return `
			<div class="card-header fs-4 p-3">
				Dati personali
			</div>
			<div class="card-body">
				
			</div>
			<div class="card-footer fs-5 text-secondary w-100 p-2 px-5">
				 <div class="d-flex w-100 justify-content-between align-items-center">
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
						</svg>
					</span>
					<span>
						1 / 5
					</span>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
						</svg>
					</span>
				</div>
			</div>
		`
	}
}