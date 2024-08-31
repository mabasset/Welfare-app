export class AlertEvent extends CustomEvent<{color: string, text: string}> {
	constructor(color: string, text: string) {
		super("alert", {detail: {color, text}});
	}
}

export class CustomError extends Error {
	constructor(
		public code: number
	) {
		const messages = new Map([
			[400, 'Bad Request'],
			[401, 'Unauthorized'],
			[404, 'This page could not be found.'],
			[409, 'Conflict.'],
			[500, 'Internal Server Error'],
			[503, 'Service Unavailable'],
		]);
		super(messages.get(code) || "Unknown Error");
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