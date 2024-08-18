export const getOffsetDate = (offset: number) => {
	const today = new Date();

	const yyyy = today.getFullYear();
	const mm = today.getMonth() + 1;
	const dd = today.getDate();
	const date = `${yyyy - offset}-${mm < 10 ? ('0' + mm) : mm}-${dd < 10 ? ('0' + dd) : dd}`;

	return date;
}