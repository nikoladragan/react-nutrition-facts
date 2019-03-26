import React, { useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../context/notificationContext';
import NotificationField from './notificationsField';

const NotificationComponent = () => {
	const [ notifications, setNotification ] = useState([]);
	const { state: notificationState } = useContext(NotificationContext);

	useEffect(() => {
		setNotification(notificationState);
	}, [ setNotification, notificationState ]);

	return (
		<div className="notifications">
			{notifications && notifications.map(e => {
				return <NotificationField key={e.id} id={e.id} name={e.name}/>;
			})}
		</div>
	);
};

export default NotificationComponent;
