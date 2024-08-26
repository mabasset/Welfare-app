export	class CustomError {
	private errorMessages = new Map<number, string>([
		[400, 'Bad Request'],
		[401, 'Unauthorized'],
		[404, 'This page could not be found.'],
		[409, 'Conflict.'],
		[500, 'Internal Server Error'],
		[503, 'Service Unavailable'],
	]);
	text: string;
	
	constructor(
		public code: number
	) {
		this.text = this.errorMessages.get(code) || "Unknown Error";
	}
}

export const getOffsetDate = (offset: number) => {
	const today = new Date();

	const yyyy = today.getFullYear();
	const mm = today.getMonth() + 1;
	const dd = today.getDate();
	const date = `${yyyy - offset}-${mm < 10 ? ('0' + mm) : mm}-${dd < 10 ? ('0' + dd) : dd}`;

	return date;
}