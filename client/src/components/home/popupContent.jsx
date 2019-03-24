import React, { useEffect, useState, useContext } from 'react';
import Heading from '../layout/heading';
import Input from '../input';
import { getFood, getFoodById } from '../../services/foodService';
import { isEmpty } from '../../helpers/helpers';
import Select from '../select';
import { MEAL_TYPE_DATA } from '../../constants';
import { PropTypes } from 'prop-types';
import { UserDataContext } from '../../context/userDataContext';
import Modal from '../modal';
import { saveDay } from '../../services/daysService';
import MealFilter from './mealFilter';


const HomeAddContent = ({ date, closeModal, checkDate }) => {
	const [ food, setFood ] = useState([]);
	const [ meals, setMeals ] = useState([]);
	const [ input, setInput ] = useState('');
	const [ mealType, setMealType ] = useState(1);
	const { userState } = useContext(UserDataContext);
	const [ expandedMeals, setExpandedMeals ] = useState([]);

	const handleInputChange = e => {
		const value = e.target.value;

		setInput(e.target.value);
		setFood(getFood(value, meals));
	};
	const handleSelectChange = e => {
		setMealType(parseInt(e.target.value));
	};
	const addMealToState = id => {
		const currentMeal = {
			id,
			amount: 0
		};

		setMeals([
			...meals,
			currentMeal
		]);

		setInput('');
		setFood([]);
	};

	useEffect(() => {
		if (meals.length > 0) {
			const x = meals.map(m => getFoodById(m.id));
			setExpandedMeals(x);
		}
	}, [ meals ]);

	const handleAmountChange = (id, value) => {
		console.log('handleAmountChange');

		const updatedMeals = meals.map(m => {
			if (id === m.id) m.amount = parseInt(value);
			return m;
		});

		setMeals([ ...updatedMeals ]);
	};

	const saveMeals = () => {
		if (meals.length === 0) return;

		const data = {
			id: userState.id,
			mealType,
			date,
			meals
		};

		saveDay(data).then(() => {
			closeModal();
			checkDate(true);
		}).catch(err => {
			console.log('error:', err);
		});
	};

	const handleCloseModal = () => {
		closeModal();
		checkDate(false);
	};

	return (
		<Modal closeModal={handleCloseModal}>
			<div>
				<Heading level={2} modifier={'small'}>Add meals</Heading>
				<div className="form">
					<div className="form__row">
						<Select
							label="Meal type"
							name="meal-type"
							value={mealType}
							data={MEAL_TYPE_DATA}
							callback={handleSelectChange} />
					</div>
					<div className="form__row">
						<Input
							value={input}
							placeholder="Type something..."
							callback={handleInputChange}
							name={`nebitno${Math.random()}`} />
					</div>
					{!isEmpty(food) &&
						<MealFilter data={food} addMealCallback={addMealToState} />
					}
					{!isEmpty(expandedMeals) &&
						<>
							{'Picked food'}
							<MealFilter data={expandedMeals} addAmountCallback={handleAmountChange} />
						</>
					}
					{meals &&
						<div className="form__action">
							<button className="form__submit" onClick={saveMeals}>Add day</button>
						</div>
					}
				</div>
			</div>
		</Modal>
	);
};

HomeAddContent.propTypes = {
	date: PropTypes.number,
	closeModal: PropTypes.func.isRequired,
	checkDate:PropTypes.func
};

export default HomeAddContent;
