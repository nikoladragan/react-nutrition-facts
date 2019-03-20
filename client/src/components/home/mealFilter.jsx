import React from 'react';
import { PropTypes } from 'prop-types';

const MealFilter = ({ data, addMealCallback, addAmountCallback }) => {
	const ButtonOrSpan = addMealCallback ? 'button' : 'span';
	return (
		<div className="form__row">
			<div className="food-filter">
				{data.map(d => {
					return <div key={d.id} className="food-filter__row">
						<ButtonOrSpan
							className="food-filter__button"
							onClick={addMealCallback ? () => addMealCallback(d.id) : null}>
							{d.name}
						</ButtonOrSpan>
						{addAmountCallback &&
							<span className="food-filter__label">
								<input type="number" onChange={(e) => addAmountCallback(d.id, e.target.value)}/>
							</span>
						}
						<span>info?</span>
					</div>;
				})}
			</div>
		</div>
	);
};

MealFilter.propTypes = {
	data: PropTypes.array,
	addMealCallback: PropTypes.func,
	addAmountCallback: PropTypes.func
};

export default MealFilter;