import * as randomWords from 'random-words';
import { getRandomInt, capitalizeFirstLetter } from './helpers/helpers';

export const getFood = () => {
	const ls = localStorage.getItem('food');

	if (ls) return;

	const	data = [];

	for (let i = 0; i < 200; i++) {
		const f = {
			id: i,
			name: randomWords({ min: 2, max: 6, join: ' ' }),
			image: 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
			calories: 0,
			fat: {
				total: 0,
				trans: null,
				saturated: null,
				polysaturated: null,
				monosaturated: null
			},
			carbs: {
				total: null,
				fibers: null,
				sugar: null
			},
			protein: null,
			sodium: getRandomInt(0, 150),
			cholesterol: getRandomInt(0, 150),
			potassium: getRandomInt(0, 300)
		};

		f.fat.total = getRandomInt(0, 33);
		f.carbs.total = getRandomInt(0, 33);
		f.protein = getRandomInt(0, 34);
		f.name = capitalizeFirstLetter(f.name);

		f.calories = f.fat.total * 9 + f.carbs.total * 4 + f.protein * 4;

		data.push(f);
	}


	localStorage.setItem('food', JSON.stringify(data));
};
