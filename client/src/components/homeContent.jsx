import React from 'react';
import { PropTypes } from 'prop-types';

const HomeContent = ({content}) => {
	console.log('HomeContent', content);
	return (
		<div>
			{content.data}
		</div>
	);
};

HomeContent.propTypes = {
	content: PropTypes.object
};

export default HomeContent;
