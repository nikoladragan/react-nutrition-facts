import React, { useEffect } from 'react';
import anime from 'animejs';
import { ANIMATION_DEFAULTS } from '../../constants';

const NoContent = () => {
	let elements = null;

	useEffect(() => {
		anime({
			targets: elements,
			translateY: [ 100, 0 ],
			opacity: [ 0, 1 ],
			delay: anime.stagger(100),
			...ANIMATION_DEFAULTS
		});
	}, []);

	return (
		<div
			ref={div => elements = div}
			className="card">
			<h2 className="title title--small">No information added today.</h2>
		</div>
	);
};

export default NoContent;
