import React, { useContext, useEffect } from 'react';
import Heading from '../layout/heading';
import anime from 'animejs';
import { UserDataContext } from '../../context/userDataContext';
import { PropTypes } from 'prop-types';
import { ANIMATION_DEFAULTS } from '../../constants';
import { getMealFromDay } from '../../services/daysService';

const Meal = ({ m, direction, date }) => {
	const { state: userState } = useContext(UserDataContext);
	let element = null;

	useEffect(() => {
		const x = direction === 'left' ? [ -100, 0 ] : direction ==='right' ? [ 100, 0 ] : [ 0, 0 ];
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


	const handleMealEdit = id => {
		getMealFromDay(userState.id, date, id)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log('err', err);
			});
	};

	return (
		<div
			ref={div => element = div}
			className="card">
			<Heading modifiers="small">{m.mealType} - {m.calories}kcal</Heading>
			<button className="card__button" onClick={() => handleMealEdit(m.id)}>edit</button>
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
	date: PropTypes.number
};

export default Meal;
