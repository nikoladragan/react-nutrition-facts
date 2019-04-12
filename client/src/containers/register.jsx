import React, { useState, useContext } from 'react';
import { register } from '../services/userService';
import { withRouter } from 'react-router-dom';
import Heading from '../components/layout/heading';
import { NotificationContext } from '../context/notificationContext';
import Form from '../components/forms/form';
import FormRow from '../components/forms/form-row';
import Input from '../components/forms/input';
import FormSubmitButton from '../components/forms/submit';

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
		<>
			<Heading level={1}>Register</Heading>
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
					text="Register"
					callback={submit}
				/>
			</Form>
		</>
	);
};

export default withRouter(RegisterPage);
