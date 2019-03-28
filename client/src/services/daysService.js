// import { getFoodById } from './foodService';
import { getLocalStorage, generateId, cleanArray } from '../helpers/helpers';

export const getDay = (date, id) => new Promise((resolve, reject) => {
	const days = localStorage.getItem('days');
	const user = getUser(id);

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
					localStorage.setItem('days', JSON.stringify(daysObject));
				}
			} else {
				// create day + user id
				daysObject[date] = {
					[id]: {
						maxCalories: user.calories,
					}
				};

				localStorage.setItem('days', JSON.stringify(daysObject));
			}

			const day = daysObject[date][id];
			const dayMeals = day.meals;

			if (dayMeals) {
				const expandedData = dayMeals.map(({ ...d }) => {
					const mealType = getMealTypeLabel(d.mealType);

					d.mealType = mealType;

					d.calories = 0;
					d.protein = 0;
					d.carbs = 0;
					d.fat = 0;

					d.content = d.content.map(c => {
						const meal = expandMeal(c.id);
						meal.calories = parseInt(meal.calories * (c.amount / 100));
						meal.amount = c.amount;

						d.calories += meal.calories;
						d.protein += meal.protein;
						d.carbs += meal.carbs.total;
						d.fat += meal.fat.total;

						return meal;
					});

					return d;
				});

				day.meals = expandedData;
				day.calories = 0;
				day.protein = 0;
				day.carbs = 0;
				day.fat = 0;

				day.meals.forEach(m => {
					day.calories += m.calories;
					day.protein += m.protein;
					day.carbs += m.carbs;
					day.fat += m.fat;
				});

				day.maxCalories = user.calories;
			}

			// localStorage.setItem('days', JSON.stringify(daysObject));
			resolve(day);
		} else {
			// nothing is present, create object with day + id
			const dayObject = {
				[date]: {
					[id]: {
						maxCalories: user.calories
					}
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

	const { id, date, meals } = data;

	// check if there are some data for this day;
	const days = getLocalStorage('days');
	const day = days[date][id];

	let finalData = {};
	if (day.meals) {
		finalData = {
			...day,
			meals: day.meals
		};

		finalData.meals.push({
			id: generateId(),
			mealType: data.mealType,
			content: meals
		});

	} else {
		finalData = {
			...day,
			meals: [
				{
					id: generateId(),
					mealType: data.mealType,
					content: meals
				}
			]
		};
	}

	days[date][id] = finalData;

	localStorage.setItem('days', JSON.stringify(days));
	resolve('Meal saved!');
});

export const getMealFromDay = (userId, dayId, mealId) => new Promise((resolve) => {
	const days = getLocalStorage('days');
	const meals = days[dayId][userId].meals;
	const meal = meals.filter(m => m.id === mealId);

	resolve(meal[0]);
});

export const getFilledDays = userId => new Promise((resolve) => {
	const days = getLocalStorage('days');
	const keys = Object.keys(days);
	const filteredDays = cleanArray(keys.map(k => {
		if (days[k][userId].meals) {
			const ret = {
				...days[k][userId],
				dateId: k
			};
			return ret;
		}
	}));

	resolve(filteredDays);
});

const expandMeal = id => {
	const meals = getLocalStorage('food');

	return meals.filter(m => m.id === id)[0];
};

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

const getUser = id => {
	const users = getLocalStorage('users');
	return users.filter(u => u._id === id)[0].data;
};
