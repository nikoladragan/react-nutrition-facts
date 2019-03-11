import React, { useState, useContext } from 'react';
import { login } from '../services/userServices';
import { AuthContext } from '../context/authContext';

const LoginPage = () => {
	const { authDispatch } = useContext(AuthContext);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const submit = () => {
		const form = { username, password };

		login(form)
			.then(
				res => {
					const data = res.data;
					localStorage.setItem('app-token', data.token);
					authDispatch({
						type: 'setAuth',
						data: true
					})

					console.log(data);
				}
			)
			.catch(err => {
				console.log(err.response);
			});
	}

	return (
		<div>
			<h1 className="title">Login</h1>
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
