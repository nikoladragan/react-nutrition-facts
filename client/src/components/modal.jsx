import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { ReactComponent as IconClose } from './../assets/icons/close.svg';
import { TweenLite } from 'gsap';
import { ANIMATION_DURATION } from '../constants';

const Modal = ({ children, closeModal }) => {
	let modal = null;
	let modalContainer = null;

	let tween = null;
	let tween2 = null;

	useEffect(() => {
		tween = TweenLite.fromTo(
			modal,
			ANIMATION_DURATION,
			{ opacity: 0 },
			{ opacity: 1 }
		);

		tween2 = TweenLite.fromTo(
			modalContainer,
			ANIMATION_DURATION,
			{
				y: 100,
				opacity: 0
			},
			{ y: 0, opacity: 1 }
		);
		tween2.delay(ANIMATION_DURATION / 2);
	}, []);

	const closeModalHandler = () => {
		tween2 = TweenLite.fromTo(
			modalContainer,
			ANIMATION_DURATION,
			{ y: 0, opacity: 1 },
			{ y: 100, opacity: 0 }
		);

		tween = TweenLite.fromTo(
			modal,
			ANIMATION_DURATION,
			{ opacity: 1 },
			{ opacity: 0 }
		);

		tween.eventCallback(
			'onComplete',
			closeModal
		);

		tween.delay(ANIMATION_DURATION / 2);
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
