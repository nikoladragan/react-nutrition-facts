import React, { useState, useContext } from 'react';
import { login } from '../services/userService';
import { AuthContext } from '../context/authContext';
import { UserDataContext } from '../context/userDataContext';
import Heading from '../components/layout/heading';
import { NotificationContext } from '../context/notificationContext';
import Form from '../components/forms/form';
import FormRow from '../components/forms/form-row';
import Input from '../components/forms/input';
import FormSubmitButton from '../components/forms/submit';

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
						data: {
							auth: true,
							admin: data.user.isAdmin
						}
					});

					userDispatch({
						type: 'setInitialData',
						data: data.user.data
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
		<>
			<Heading level={1}>Login</Heading>
			<Form>
				<FormRow>
					<Input
						label="Username"
						callback={e => setUsername(e.target.value)}
						name="username"
						value={username}
						placeholder="Username"
					/>
				</FormRow>
				<FormRow>
					<Input
						label="Password"
						callback={e => setPassword(e.target.value)}
						name="password"
						value={password}
						placeholder="Password"
						type="password"
					/>
				</FormRow>
				<FormSubmitButton
					text="Login"
					callback={submit}
				/>
			</Form>
		</>
	);
};

export default LoginPage;
