import React, { useEffect, useContext, useCallback, useRef } from 'react';
import { PropTypes } from 'prop-types';
import anime from 'animejs';
import { ANIMATION_DEFAULTS } from '../constants';
import { NotificationContext } from '../context/notificationContext';

const NotificationField = ({ name, id }) => {
	const { dispatch: notificationDispatch } = useContext(NotificationContext);
	const notification = useRef();

	useEffect(() => {
		setTimeout(closeNotification, 2000);

		anime({
			targets: notification.current,
			translateX: [ 100, 0 ],
			height: [ 0, notification.current.scrollHeight ],
			opacity: [ 0, 1 ],
			...ANIMATION_DEFAULTS,
		});
	}, [ notification, notificationDispatch, id, name, closeNotification ]);

	const closeNotification = useCallback(() => {
		notification.current &&
		anime({
			targets: notification.current,
			translateX: [ 0, -100 ],
			height: [ notification.current.scrollHeight, 0 ],
			opacity: [ 1, 0 ],
			...ANIMATION_DEFAULTS,
			complete: () => {
				notificationDispatch({
					type: 'removeNotification',
					data: id
				});
			}
		});
	}, [ id, notificationDispatch ]);

	return (
		<div style={{ opacity: 0 }}ref={div => notification.current = div}>
			<div
				onClick={closeNotification}
				className="card card--show card--warning">{name}</div>
		</div>
	);
};

NotificationField.propTypes = {
	name: PropTypes.string,
	id: PropTypes.string
};

export default NotificationField;
