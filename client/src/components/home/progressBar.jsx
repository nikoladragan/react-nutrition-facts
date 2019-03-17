import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ p, c, f, bar }) => {
	const percentage = (x) => {
		return { width: `${x}%` };
	};

	return (
		<div className="progress">
			<div className="progress__inner" style={percentage(bar)}>
				<div className="progress__part progress__part--blue" style={percentage(p)}></div>
				<div className="progress__part progress__part--green" style={percentage(c)}></div>
				<div className="progress__part progress__part--orange" style={percentage(f)}></div>
			</div>
		</div>
	);
};

ProgressBar.propTypes = {
	p: PropTypes.number,
	c: PropTypes.number,
	f: PropTypes.number,
	bar: PropTypes.number,
};

export default ProgressBar;
