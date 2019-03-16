import React, { useState } from 'react';
import { register } from '../services/userService';
import { withRouter } from 'react-router-dom';

const RegisterPage = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submit = () => {
		const form = { username, password };

		register(form)
			.then(() => {
				props.history.push('/login');
			})
			.catch(res => {
				console.log(res);
			});
	};

	return (
		<div>
			<h1 className="title">Register</h1>
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
