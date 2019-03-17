export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getTodayDate = () => {
	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	return `${year}-${month}-${day}`;
};

export const generateId = (length = 16) => {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

export const getLocalStorage = name => {
	return JSON.parse(localStorage.getItem(name)) || [];
};

export const getRandomInt = (min = 0, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = a => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[ a[i], a[j] ] = [ a[j], a[i] ];
	}
	return a;
};

export const isEmpty = a => {
	const hasOwnProperty = Object.prototype.hasOwnProperty;

	// null and undefined are "empty"
	if (a === null) return true;
	if (a === undefined) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (a.length > 0) return false;
	if (a.length === 0) return true;

	// If it isn't an object at this point
	// it is empty, but it can't be anything *but* empty
	// Is it empty?  Depends on your application.
	if (typeof a !== 'object') return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (const key in a) {
		if (hasOwnProperty.call(a, key)) return false;
	}

	return true;
};
