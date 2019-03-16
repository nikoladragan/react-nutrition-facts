import React, { useEffect, useState, useRef } from 'react';
import Heading from './layout/heading';
import Input from './input';
import { getFood } from '../services/foodService';
import { isEmpty } from '../helpers/helpers';
import Select from './select';
import { MEAL_TYPE_DATA } from '../constants';


const HomeAddContent = () => {
	const [ food, setFood ] = useState([]);
	// const [ day, setDay ] = useState([]);
	const [ input, setInput ] = useState('');

	const handleInputChange = e => {
		const value = e.target.value;

		setInput(e.target.value);
		setFood(getFood(value));
	};
	const handleSelectChange = e => {
		console.log(e.target.value);
	};

	const addMealToState = id => {
		console.log(id);

		setInput('');
		setFood([]);
	};

	return (
		<div>
			<Heading level={2} className={'something-else'}>Something?</Heading>
			<div className="form">
				<div className="form__row">
					<Select
						label="Meal type"
						name="meal-type"
						value={1}
						useValue={true}
						data={MEAL_TYPE_DATA}
						callback={handleSelectChange} />
				</div>
				<div className="form__row">
					<Input
						value={input}
						placeholder="Type something..."
						callback={handleInputChange}
						name="nebitno" />
					{!isEmpty(food) &&
						<div className="food-filter">
							{food.map(f => {
								return <button onClick={() => addMealToState(f.id)} key={f.id}>{f.name}</button>;
							})}
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default HomeAddContent;
