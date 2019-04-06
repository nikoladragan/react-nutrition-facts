import React, { useContext, useEffect, useState } from 'react';
import Heading from '../layout/heading';
import anime from 'animejs';
import { UserDataContext } from '../../context/userDataContext';
import { PropTypes } from 'prop-types';
import { ANIMATION_DEFAULTS } from '../../constants';
import { deleteMeal } from '../../services/daysService';
import { NotificationContext } from '../../context/notificationContext';

const Meal = ({ m, direction, date, setDay }) => {
	// const [ data, setData ] = useState(m);
	const { state: userState } = useContext(UserDataContext);
	const { dispatch: notificationDispatch } = useContext(NotificationContext);

	let element = null;

	useEffect(() => {
		const x = direction === 'left' ? [ -200, 0 ] : direction ==='right' ? [ 200, 0 ] : [ 0, 0 ];
		const y = direction === 'bottom' ? [ 100, 0 ] : [ 0, 0 ];

		anime({
			targets: element,
			translateX: x,
			translateY: y,
			opacity: [ 0, 1 ],
			delay: anime.stagger(100),
			...ANIMATION_DEFAULTS
		});
	}, [ direction, element ]);


	const handleMealDelete = id => {
		deleteMeal(userState.id, date, id)
			.then(res => {
				notificationDispatch({
					type: 'addNewNotification',
					data: {
						name: res.message,
						type: 'good'
					}
				});
				setDay(res.data);
			});
	};

	return (
		<div
			ref={div => element = div}
			className="card">
			<Heading modifiers="small">{m.mealType} - {m.calories}kcal</Heading>
			<button className="card__button" onClick={() => handleMealDelete(m.id)}>delete</button>
			<div>
				{m.content.map(c => {
					return <div
						key={c.id}
						className="card__item">
						<div className="card__top">
							<img className="card__image" src={c.image} alt={c.name}/>
							<h3 className="card__title">{c.name}</h3>
						</div>
						<p>calories: {c.calories}</p>
						<p>{c.amount}gr</p>
					</div>;
				})}
			</div>
		</div>
	);
};

Meal.propTypes = {
	m: PropTypes.object,
	direction: PropTypes.string,
	date: PropTypes.number,
	setDay: PropTypes.func
};

export default Meal;
