import React from 'react';
import { PropTypes } from 'prop-types';
import Meal from './meal';

const HomeContent = ({ content, direction, date, setDay }) => {
	return (
		<div className="cards">
			{content.meals.map(m => {
				return <Meal key={m.id} m={m} direction={direction} date={date} setDay={setDay}/>;
			})}
		</div>
	);
};

HomeContent.propTypes = {
	content: PropTypes.object,
	direction: PropTypes.string,
	date: PropTypes.number,
	setDay: PropTypes.func
};

export default HomeContent;
