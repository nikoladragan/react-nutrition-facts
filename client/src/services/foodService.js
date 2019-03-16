import { getLocalStorage, isEmpty } from '../helpers/helpers';

export const getFood = (query, numOfResults = 5) => {
	if(isEmpty(query)) return [];

	const food = getLocalStorage('food');
	let result = food.filter(f => f.name.toLowerCase().indexOf(query.toLowerCase()) > -1 );
	result = result.map(r => {
		return {
			name: r.name,
			id: r.id
		};
	});
	return result.slice(0, numOfResults);
};
