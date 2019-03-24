import React, { useEffect } from 'react';
import anime from 'animejs';
import { ANIMATION_DEFAULTS } from '../../constants';
import Heading from '../layout/heading';

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
	}, [ elements ]);

	return (
		<div
			ref={div => elements = div}
			className="card">
			<Heading modifiers="small">No information added today.</Heading>
		</div>
	);
};

export default NoContent;
