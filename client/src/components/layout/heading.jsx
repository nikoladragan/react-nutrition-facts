import React from 'react';
import { PropTypes } from 'prop-types';

const Heading = ({ level = 2, className = level, children }) => {
	const DynamicHeading = `h${level}`;
	const dynamicClass = className === level ? `h${className}` : className;
	return (
		<DynamicHeading className={dynamicClass}>{children}</DynamicHeading>
	);
};

Heading.propTypes = {
	level: PropTypes.number.isRequired,
	className: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default Heading;
