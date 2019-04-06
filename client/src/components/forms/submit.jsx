import React from 'react';
import { PropTypes } from 'prop-types';

const FormSubmitButton = ({ callback, text }) => {
	return (
		<button
			className="form__submit"
			type="button"
			onClick={callback}>{text}</button>
	);
};

FormSubmitButton.propTypes = {
	callback: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
};

export default FormSubmitButton;
