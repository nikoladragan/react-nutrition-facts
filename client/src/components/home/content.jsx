import React, { useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';
import anime from 'animejs';
import { ANIMATION_DEFAULTS } from '../../constants';
import { getMealFromDay } from '../../services/daysService';
import { UserDataContext } from '../../context/userDataContext';

const HomeContent = ({ content, direction, date }) => {
	const { userState } = useContext(UserDataContext);
	const elements = [];

	useEffect(() => {
		const left = direction === 'left';
		anime({
			targets: elements,
			translateX: [ left ? -100 : 100, 0 ],
			opacity: [ 0, 1 ],
			delay: anime.stagger(100),
			...ANIMATION_DEFAULTS
		});
	}, [ content ]);

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
		<div className="cards">
			{content.meals.map((m, index) => {
				return <div
					key={m.id}
					ref={div => elements[index] = div}
					className="card">
					<h2 className="title title--small">{m.mealType}</h2>
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
				</div>;
			})}
		</div>
	);
};

HomeContent.propTypes = {
	content: PropTypes.object,
	direction: PropTypes.string,
	date: PropTypes.number
};

export default HomeContent;
