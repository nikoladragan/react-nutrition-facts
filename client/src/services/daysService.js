import { getFoodById } from './foodService';
import { getLocalStorage, isEmpty } from '../helpers/helpers';

export const getDay = (date, id) => new Promise((resolve, reject) => {
	const days = localStorage.getItem('days');

	// did user provide day?
	if (date) {
		// do we have any records?
		if (days) {
			const daysObject = JSON.parse(days);

			// check if days is created
			if (daysObject[date]) {
				// check if current id is present
				if (!daysObject[date][id]) {
					daysObject[date][id] = {};
				}
			} else {
				// create day + user id
				daysObject[date] = {
					[id]: {}
				};
			}

			localStorage.setItem('days', JSON.stringify(daysObject));
			resolve(daysObject[date][id]);
		} else {
			// nothing is present, create object with day + id
			const dayObject = {
				[date]: {
					[id]: {}
				}
			};

			localStorage.setItem('days', JSON.stringify(dayObject));
			resolve(dayObject[date][id]);
		}
	} else {
		reject('no data provided');
	}
});

export const saveDay = data => new Promise((resolve, reject) => {
	if (!data) reject('something went wrong');

	const { id, date } = data;

	// check if there are some data for this day;
	const days = getLocalStorage('days');
	const day = days[date][id];

	let totalCalories = 0;
	let totalCarbs = 0;
	let totalFats = 0;
	let totalProtein = 0;

	const expandedMeals = data.meals.map(m => {
		const meal = getFoodById(m.id);

		m.amount = 100;

		meal.amount = m.amount;

		totalCalories += meal.calories * m.amount / 100;
		totalCarbs += meal.carbs.total * m.amount / 100;
		totalFats += meal.fat.total * m.amount / 100;
		totalProtein += meal.protein * m.amount / 100;

		return meal;
	});

	let finalData = {};

	const mealTypeLabel = getMealTypeLabel(data.mealType);

	if (!isEmpty(day)) {
		totalCalories += day.calories;
		totalCarbs += day.carbs;
		totalFats += day.fats;
		totalProtein += day.protein;

		finalData = {
			calories: totalCalories,
			carbs: totalCarbs,
			fat: totalFats,
			protein: totalProtein,
			meals: day.meals
		};

		finalData.meals.push({
			mealType: mealTypeLabel,
			content: expandedMeals
		});

	} else {
		finalData = {
			calories: totalCalories,
			carbs: totalCarbs,
			fat: totalFats,
			protein: totalProtein,
			meals: [
				{
					mealType: mealTypeLabel,
					content: expandedMeals
				}
			]
		};
	}

	days[date][id] = finalData;
	localStorage.setItem('days', JSON.stringify(days));

	resolve('done!');
});



// local functions
const getMealTypeLabel = (number) => {
	switch (number) {
		case 1:
			return 'Breakfast';
		case 2:
			return 'Snack';
		case 3:
			return 'Lunch';
		case 4:
			return 'Dinner';
		default:
			return null;
	}
};
