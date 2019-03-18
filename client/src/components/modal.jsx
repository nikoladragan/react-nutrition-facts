import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { ReactComponent as IconClose } from './../assets/icons/close.svg';

import anime from 'animejs';
import { ANIMATION_DURATION, ANIMATION_DEFAULTS } from '../constants';

const Modal = ({ children, closeModal }) => {
	let modal = null;
	let modalContainer = null;

	useEffect(() => {
		anime({
			targets: modal,
			opacity: [ 0, 1 ],
			...ANIMATION_DEFAULTS,
		});

		anime({
			targets: modalContainer,
			delay: ANIMATION_DURATION / 2,
			translateY: [ 100, 0 ],
			opacity: [ 0, 1 ],
			...ANIMATION_DEFAULTS,
		});
	}, []);

	const closeModalHandler = () => {
		anime({
			targets: modalContainer,
			translateY: [ 0, 100 ],
			opacity: [ 1, 0 ],
			...ANIMATION_DEFAULTS,
		});

		anime({
			targets: modal,
			opacity: [ 1, 0 ],
			delay: ANIMATION_DURATION / 2,
			...ANIMATION_DEFAULTS,
			complete: closeModal
		});
	};

	return (
		<div ref={div => modal = div} className="modal">
			<div ref={div => modalContainer = div} className="modal__content">
				<button className="modal__close" onClick={closeModalHandler}>
					<IconClose />
					<span className="sr-only">Close modal</span>
				</button>
				{children}
			</div>
		</div>
	);
};

Modal.propTypes = {
	closeModal: PropTypes.func
};

export default Modal;
