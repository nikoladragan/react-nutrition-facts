export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getTodayDate = () => {
	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	return `${year}-${month}-${day}`;
};
