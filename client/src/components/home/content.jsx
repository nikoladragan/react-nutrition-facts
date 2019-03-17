import React from 'react';
import { PropTypes } from 'prop-types';

const HomeContent = ({ content }) => {
	return (
		<div>
			{content.meals.map(m => {
				return <div key={Math.random()} style={{ border: '1px solid red', marginBottom: 20 }}>
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
