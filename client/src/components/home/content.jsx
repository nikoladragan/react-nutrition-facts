import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { ANIMATION_DURATION } from '../../constants';
import { TimelineLite } from 'gsap';

const HomeContent = ({ content }) => {
	const elements = [];

	useEffect(() => {
		const tl = new TimelineLite();

		tl.staggerFromTo(
			elements,
			ANIMATION_DURATION,
			{
				opacity: 0,
				x: 100
			},
			{
				opacity: 1,
				x: 0
			},
			0.1
		);
	}, [ content ]);

	return (
		<div>
			{content.meals.map((m, index) => {
				return <div
					key={Math.random()}
					className="PH_element"
					ref={div => elements[index] = div}>
					<h2>{m.mealType}</h2>
					<div>
						{m.content.map(c => {
							return <div key={Math.random()} style={{ border: '1px solid orange', marginBottom: 10 }}>
								<img src={c.image} style={{ height: 30 }} alt={c.name}/>
								<h3>{c.name}</h3>
								<p>calories: {c.calories}</p>
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
