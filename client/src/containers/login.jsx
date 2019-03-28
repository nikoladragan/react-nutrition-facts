import React, { useState, useContext } from 'react';
import { login } from '../services/userService';
import { AuthContext } from '../context/authContext';
import { UserDataContext } from '../context/userDataContext';
import Heading from '../components/layout/heading';
import { NotificationContext } from '../context/notificationContext';

const LoginPage = () => {
	const { dispatch: authDispatch } = useContext(AuthContext);
	const { dispatch: userDispatch } = useContext(UserDataContext);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const { dispatch: notificationDispatch } = useContext(NotificationContext);

	const submit = () => {
		const form = { username, password };

		login(form)
			.then(
				res => {
					const data = res;
					localStorage.setItem('app-token', data.token);

					authDispatch({
						type: 'setAuth',
						data: true
					});

					userDispatch({
						type: 'setInitialData',
						data: res.user.data
					});
				}
			)
			.catch(err => {
				notificationDispatch({
					type: 'addNewNotification',
					data: {
						name: err,
						type: 'bad'
					}
				});
			});
	};

	return (
		<div>
			<Heading level={1}>Login</Heading>
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
					onClick={() => submit()}>Login</button>
			</form>
			username: {username} <br />
			password: {password}
		</div>
	);
};

export default LoginPage;
