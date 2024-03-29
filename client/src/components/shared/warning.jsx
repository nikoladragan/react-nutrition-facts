import React from 'react';
import { ReactComponent as IconWarning } from '../../assets/icons/warning.svg';
import Heading from '../layout/heading';

const Warning = () => {
	return (
		<div className="card card--show card--warning">
			<Heading level={2} modifiers={'small'}>Ups</Heading>
			<IconWarning className="card__icon" />
		</div>
	);
};

export default Warning;
