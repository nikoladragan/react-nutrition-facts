import React from 'react';
import { PropTypes } from 'prop-types';

const Heading = ({ level = 2, modifiers = '', children }) => {
	const DynamicHeading = `h${level}`;
	const dynamicClass =
		typeof modifiers === 'string' ?
			`title--${modifiers}` :
			modifiers.map(m => `title--${m}`).join(' ');

	return (
		<DynamicHeading className={`title ${dynamicClass}`}>{children}</DynamicHeading>
	);
};

Heading.propTypes = {
	level: PropTypes.number,
	modifiers: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string
	])
};

export default Heading;
