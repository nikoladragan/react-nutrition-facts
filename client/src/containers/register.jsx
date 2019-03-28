import React, { useState, useContext } from 'react';
import { register } from '../services/userService';
import { withRouter } from 'react-router-dom';
import Heading from '../components/layout/heading';
import { NotificationContext } from '../context/notificationContext';

const RegisterPage = (props) => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const { dispatch: notificationDispatch } = useContext(NotificationContext);


	const submit = () => {
		const form = { username, password };

		register(form)
			.then(response => {
				notificationDispatch({
					type: 'addNewNotification',
					data: {
						name: response,
						type: 'good'
					}
				});
				props.history.push('/login');
			})
			.catch(res => {
				notificationDispatch({
					type: 'addNewNotification',
					data: {
						name: res,
						type: 'bad'
					}
				});
			});
	};

	return (
		<div>
			<Heading level={1}>Register</Heading>
			<form className="form">
				<div className="form__row">
					<input
						className="form__input"
						type="text"
						onChange={e => setUsername(e.target.value)}
						placeholder="Username"/>
				</div>
				<div className="form__row">
					<input
						className="form__input"
						type="password"
						onChange={e => setPassword(e.target.value)}
						placeholder="Password"/>
				</div>
				<button
					className="form__submit"
					type="button"
					onClick={() => submit()}>Register</button>
			</form>
			username: {username} <br />
			password: {password}
		</div>
	);
};

export default withRouter(RegisterPage);
