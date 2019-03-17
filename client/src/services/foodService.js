import { getLocalStorage, isEmpty } from '../helpers/helpers';

export const getFood = (query, exclude, numOfResults = 5) => {
	if (isEmpty(query)) return [];

	const food = getLocalStorage('food');
	const result = food.filter(f => {
		const condition1 = f.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
		const exludeId = exclude.map(e => e.id);
		const condition2 = exludeId.indexOf(f.id) === -1;

		return condition1 && condition2;
	});

	return result.slice(0, numOfResults);
};

export const getFoodById = id => {
	const food = getLocalStorage('food');
	const result = food.filter(f => f.id === id);

	return result.length ? result[0] : null;
};
