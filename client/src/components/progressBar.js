import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({p, c, f, bar}) => {
	const [expanded, setExpanded] = useState(false);

	const percentage = (x) => {
		return {width: `${x}%`};
	};

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<div className={`progress${expanded ? ' progress--expanded' : ''}`} onClick={() => toggleExpand()}>
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
