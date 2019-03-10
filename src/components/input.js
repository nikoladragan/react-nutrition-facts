import React from 'react';
import { PropTypes } from 'prop-types';

const Input = ({type, label, placeholder, name, value, callback}) => {
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				type={type}
				className="form__input"
				placeholder={placeholder}
				name={name}
				value={value}
				id={name}
				onChange={callback}/>
		</>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	callback: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default Input;
