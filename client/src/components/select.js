import React from 'react';
import { PropTypes } from 'prop-types';

const Select = ({label, name, value, callback, data}) => {
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
				<select
					className="form__input form__input--select"
					id={name}
					defaultValue={value}
					onChange={callback}>
					{data.map(d => {
						return <option key={d.text} value={d.value}>{d.text}</option>;
					})}
				</select>
		</>
	);
};

Select.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	callback: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	data: PropTypes.array
};

export default Select;
