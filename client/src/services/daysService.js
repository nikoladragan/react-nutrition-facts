import { getLocalStorage } from '../helpers/helpers';

export const getDay = (data, id) => new Promise((resolve, reject) => {
	const days = getLocalStorage('days');

	if(data && days[data] && days[data][id]) {
		resolve(days[data][id]);
	} else {
		reject('no records for this day');
	}

	// resolve(getLocalStorage('days'));
});
