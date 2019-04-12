import React, { useState, useEffect, useContext, memo } from 'react';
import { NotificationContext } from '../context/notificationContext';
import NotificationField from './notificationsField';

const NotificationComponent = () => {
	const { state: notificationState } = useContext(NotificationContext);
	const [ notifications, setNotification ] = useState(notificationState);

	useEffect(() => {
		setNotification(notificationState);
	}, [ setNotification, notificationState ]);

	return (
		<div className="notifications">
			{notifications && notifications.map(e => {
				return <NotificationField key={e.id} {...e}/>;
			})}
		</div>
	);
};

export default memo(NotificationComponent);
