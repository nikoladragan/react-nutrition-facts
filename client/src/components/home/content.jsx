import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { TimelineLite } from 'gsap';
import { ANIMATION_DURATION } from '../../constants';

const HomeContent = ({ content }) => {
	const elements = [];

	useEffect(() => {
		const tl = new TimelineLite();

		tl.staggerFromTo(
			elements,
			ANIMATION_DURATION,
			{
				x: 100,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1
			},
			0.1
		);
	}, [ content ]);

	return (
		<div className="cards">
			{content.meals.map((m, index) => {
				return <div
					key={m.id}
					ref={div => elements[index] = div}
					className="card">
					<h2 className="title title--small">{m.mealType}</h2>
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
	content: PropTypes.object
};

export default HomeContent;
