import React from 'react';
import { PropTypes } from 'prop-types';

const Modal = ({children, closeModal}) => {
	return (
		<div className="modal">
			<div className="modal__content">
				<button className="modal__close" onClick={closeModal}>Close modal</button>
				{children}
			</div>
		</div>
	);
};

Modal.propTypes = {
	closeModal: PropTypes.func
};

export default Modal;
