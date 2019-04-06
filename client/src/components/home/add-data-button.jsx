import React from 'react';
import { ReactComponent as IconAdd } from '../../assets/icons/add.svg';
import { PropTypes } from 'prop-types';


const AddDataButton = ({ callback, modalVisible }) => {
	return (
		<button className="button-action" onClick={() => callback(!modalVisible)}>
			<span className="sr-only">Add data</span>
			<IconAdd />
		</button>
	);
};

AddDataButton.propTypes = {
	callback: PropTypes.func.isRequired,
	modalVisible: PropTypes.bool.isRequired
};

export default AddDataButton;
