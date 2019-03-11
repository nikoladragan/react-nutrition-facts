import React, { useState } from 'react';
import { register } from '../services/userServices';

const RegisterPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submit = () => {
		const form = { username, password };

		register(form)
			.then(
				res => {
					const data = res.data;
					console.log(data);
				}
			)
	}

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
					onClick={() => submit()}>Login</button>
			</form>
			username: {username} <br />
			password: {password}
		</div>
	);
};

export default RegisterPage;
