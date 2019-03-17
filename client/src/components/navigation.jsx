import React, { useState, useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../services/userService';
import { AuthContext } from '../context/authContext';
import { NAV_DATA } from '../constants';

const Navigation = (props) => {
	const [ menuState, setMenuState ] = useState(false);
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

	const showAlways = (show) => show === 1;
	const showIfLoggedIn = (show) => isAuth && show === 2;
	const showIfNotLoggedIn = (show) => show === 3 && !isAuth;
	const showItem = (n) => showAlways(n.show) || showIfLoggedIn(n.show) || showIfNotLoggedIn(n.show);


	return (
		<div className="nav">
			<button className={`nav__toggle${menuState ? ' nav__toggle--active' : ''}`} onClick={() => menuToggleEvent()}>
				<span className="nav__toggle-line nav__toggle-line--first"></span>
				<span className="nav__toggle-line nav__toggle-line--mid"></span>
				<span className="nav__toggle-line nav__toggle-line--last"></span>
			</button>
			<ul className={`nav__list${menuState ? ' nav__list--active' : ''}`}>
				{NAV_DATA.map(n => {
					return (
						showItem(n) &&
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
