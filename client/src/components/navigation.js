import React, { useState, useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../services/userServices';
import { AuthContext } from '../context/authContext';

const nav = [
	{
		url: '/home',
		text: 'Home',
		show: 1
	},
	{
		url: '/profile',
		text: 'Profile',
		show: 2
	},
	{
		url: '/admin',
		text: 'Admin',
		show: 1
	},
	{
		url: '/login',
		text: 'Login',
		show: 3
	},
	{
		url: '/register',
		text: 'Register',
		show: 3
	},
	{
		url: '/overview',
		text: 'Overview',
		show: 2
	}
];

const Navigation = (props) => {
	const [menuState, setMenuState] = useState(false);
	const { authState, authDispatch } = useContext(AuthContext);
	const isAuth = authState.isAuthenticated;

	const menuToggleEvent = () => {
		setMenuState(!menuState);
	};

	const logoutEvent = () => {
		logout({ token: localStorage.getItem('app-token') })
			.then(() => {
				localStorage.removeItem('app-token');

				setMenuState(false);
				authDispatch({
					type: 'setAuth',
					data: false
				});

				props.history.push('/');
			});
	};

	return (
		<div className="nav">
			<button className={`nav__toggle${menuState ? ' nav__toggle--active' : ''}`} onClick={() => menuToggleEvent()}>
				<span className="nav__toggle-line nav__toggle-line--first"></span>
				<span className="nav__toggle-line nav__toggle-line--mid"></span>
				<span className="nav__toggle-line nav__toggle-line--last"></span>
			</button>
			<ul className={`nav__list${menuState ? ' nav__list--active' : ''}`}>
				{nav.map(n => {
					return (
						(n.show === 1 || n.show === 2 && isAuth || n.show === 3 && !isAuth) &&
						<li className="nav__item" key={n.text}>
							<NavLink
								exact
								className="nav__link"
								activeClassName="nav__link--active"
								onClick={() => menuToggleEvent()} to={n.url}>{n.text}</NavLink>
						</li>
					);
				})}
				{isAuth && <li className="nav__link">
					<button onClick={logoutEvent}>Logout</button>
				</li>}
			</ul>
		</div>
	);
};

export default withRouter(Navigation);
