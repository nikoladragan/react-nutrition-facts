import React, { useEffect, useContext, useCallback, useRef } from 'react';
import { PropTypes } from 'prop-types';
import anime from 'animejs';
import { ANIMATION_DEFAULTS, ANIMATION_DURATION } from '../constants';
import { NotificationContext } from '../context/notificationContext';

const NotificationField = ({ name, id, type }) => {
	const { dispatch: notificationDispatch } = useContext(NotificationContext);
	const notification = useRef();

	const closeNotification = useCallback(() => {
		notification.current &&
		anime({
			targets: notification.current,
			translateX: {
				value: [ 0, -100 ],
				...ANIMATION_DEFAULTS
			},
			opacity: {
				value: [ 1, 0 ],
				...ANIMATION_DEFAULTS
			},
			height: {
				value: [ notification.current.scrollHeight, 0 ],
				delay: ANIMATION_DURATION,
				...ANIMATION_DEFAULTS
			},
			complete: () => {
				notificationDispatch({
					type: 'removeNotification',
					data: id
				});
			}
		});
	}, [ id, notificationDispatch ]);

	useEffect(() => {
		setTimeout(closeNotification, 2000);

		anime({
			targets: notification.current,
			height: [ 0, notification.current.scrollHeight ],
			translateX: {
				value: [ 100, 0 ],
				delay: ANIMATION_DURATION / 2,
				...ANIMATION_DEFAULTS,
			},
			opacity: {
				value: [ 0, 1 ],
				delay: ANIMATION_DURATION / 2,
				...ANIMATION_DEFAULTS,
			},
			...ANIMATION_DEFAULTS,
			duration: ANIMATION_DURATION / 2
		});
	}, [ notification, notificationDispatch, id, name, closeNotification ]);

	const getNotificationColor = (type) => {
		switch (type) {
			case 'good':
				return 'card--good';
			case 'bad':
				return 'card--warning';
			default:
				return '';
		}
	};

	return (
		<div style={{ opacity: 0 }}ref={div => notification.current = div}>
			<div
				onClick={closeNotification}
				className={`card card--show ${getNotificationColor(type)}`}>{name}</div>
		</div>
	);
};

NotificationField.propTypes = {
	name: PropTypes.string,
	id: PropTypes.string,
	type: PropTypes.string
};

export default NotificationField;
