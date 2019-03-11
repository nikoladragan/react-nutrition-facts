import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const nav = [
	{
		url: '/',
		text: 'Home',
	},
	{
		url: '/profile',
		text: 'Profile',
	},
	{
		url: '/admin',
		text: 'Admin',
	},
	{
		url: '/login',
		text: 'Login',
	},
	{
		url: '/register',
		text: 'Register',
	},
	{
		url: '/overview',
		text: 'Overview'
	}
];

const Navigation = () => {
	const [menuState, setMenuState] = useState(false);

	const menuToggleEvent = () => {
		setMenuState(!menuState);
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
						<li className="nav__item" key={n.text}>
							<NavLink
								exact
								className="nav__link"
								activeClassName="nav__link--active"
								onClick={() => menuToggleEvent()} to={n.url}>{n.text}</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Navigation;
