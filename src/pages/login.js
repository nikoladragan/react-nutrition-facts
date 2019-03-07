import React from 'react';

const LoginPage = () => {
	return (
		<div>
			<h1 className="title">Login</h1>
			<form className="form">
				<div className="form__row">
					<input className="form__input" type="text" placeholder="Username"/>
				</div>
				<div className="form__row">
					<input className="form__input" type="password" placeholder="Password"/>
				</div>
				<button className="form__submit" type="button">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
