import React, { useEffect, useState, useContext } from 'react';
import Heading from '../layout/heading';
import Input from '../forms/input';
import { getFood, getFoodById } from '../../services/foodService';
import { isEmpty } from '../../helpers/helpers';
import Select from '../forms/select';
import { MEAL_TYPE_DATA } from '../../constants';
import { PropTypes } from 'prop-types';
import { UserDataContext } from '../../context/userDataContext';
import Modal from '../modal';
import { saveDay } from '../../services/daysService';
import MealFilter from './mealFilter';
import { NotificationContext } from '../../context/notificationContext';
import Form from '../forms/form';
import FormRow from '../forms/form-row';
import FormSubmitButton from '../forms/submit';


const HomeAddContent = ({ date, closeModal, checkDate }) => {
	const [ food, setFood ] = useState([]);
	const [ meals, setMeals ] = useState([]);
	const [ input, setInput ] = useState('');
	const [ mealType, setMealType ] = useState(1);
	const { state: userState } = useContext(UserDataContext);
	const [ expandedMeals, setExpandedMeals ] = useState([]);
	const { dispatch: notificationDispatch } = useContext(NotificationContext);

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
		const updatedMeals = meals.map(m => {
			if (id === m.id) m.amount = parseInt(value);
			return m;
		});

		setMeals([ ...updatedMeals ]);
	};

	const saveMeals = () => {
		if (meals.length === 0) {
			notificationDispatch({
				type: 'addNewNotification',
				data: {
					name: 'You need to add something first',
					type: 'bad'
				}
			});

			return;
		}

		const data = {
			id: userState.id,
			mealType,
			date,
			meals
		};

		saveDay(data).then(res => {
			closeModal();
			checkDate(true);
			notificationDispatch({
				type: 'addNewNotification',
				data: {
					name: res,
					type: 'good'
				}
			});
		}).catch(err => {
			notificationDispatch({
				type: 'addNewNotification',
				data: {
					name: err,
					type: 'bad'
				}
			});
		});
	};

	const handleCloseModal = () => {
		closeModal();
		checkDate(false);
	};

	return (
		<Modal closeModal={handleCloseModal}>
			<>
				<Heading level={2} modifier={'small'}>Add meals</Heading>
				<Form>
					<FormRow>
						<Select
							label="Meal type"
							name="meal-type"
							value={MEAL_TYPE_DATA[0].value}
							data={MEAL_TYPE_DATA}
							callback={handleSelectChange} />
					</FormRow>
					<FormRow>
						<Input
							value={input}
							placeholder="Type something..."
							callback={handleInputChange}
							name={`nebitno${Math.random()}`} />
					</FormRow>
					{!isEmpty(food) &&
						<FormRow>
							<MealFilter data={food} addMealCallback={addMealToState} />
						</FormRow>
					}
					{!isEmpty(expandedMeals) &&
						<FormRow>
							{'Picked food'}
							<MealFilter data={expandedMeals} addAmountCallback={handleAmountChange} />
						</FormRow>
					}
					{meals && <FormSubmitButton callback={saveMeals} text="Add day"/>}
				</Form>
			</>
		</Modal>
	);
};

HomeAddContent.propTypes = {
	date: PropTypes.number,
	closeModal: PropTypes.func.isRequired,
	checkDate: PropTypes.func
};

export default HomeAddContent;
