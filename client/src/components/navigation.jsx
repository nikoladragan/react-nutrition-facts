import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { logout } from '../services/userService';
import { AuthContext } from '../context/authContext';
import { NAV_DATA } from '../constants';

const Navigation = ({ history }) => {
	const [ menuState, setMenuState ] = useState();
	const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
	const isAuth = authState.isAuthenticated;
	const isAdmin = authState.isAdmin;
	const canMove = useRef(false);
	const clientX = useRef(0);

	const handleTouchStart = useCallback(e => {
		canMove.current = true;
		clientX.current = e.touches[0].pageX;
	}, []);

	const handleTouchMove = useCallback(e => {
		if (canMove.current) {
			const x = e.touches[0].pageX;

			if (x + 50 < clientX.current) {
				setMenuState(true);
			} else if (x - 50 > clientX.current) {
				setMenuState(false);
			}
		}
	}, [ canMove, clientX ]);

	const handleTouchEnd = useCallback(() => {
		canMove.current = false;
		clientX.current = 0;
	}, []);

	useEffect(() => {
		const root = document.querySelector('.root');

		if (root) {
			root.addEventListener('touchstart', e => handleTouchStart(e));
			root.addEventListener('touchmove', e => handleTouchMove(e));
			root.addEventListener('touchend', e => handleTouchEnd(e));
		}
	}, [ handleTouchEnd, handleTouchMove, handleTouchStart ]);

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

				history.push('/');
			});
	};

	const showAlways = (show) => show === 1;
	const showIfLoggedIn = (show) => isAuth && show === 2;
	const showIfNotLoggedIn = (show) => show === 3 && !isAuth;
	const showIfAdmin = (show) => show === 4 && isAdmin;
	const showItem = (n) => showAlways(n.show) || showIfLoggedIn(n.show) || showIfNotLoggedIn(n.show) || showIfAdmin(n.show);


	return (
		<header className={`header${menuState ? ' header--active': ''}`}>
			<div className="nav">
				<div className="nav__indicator"></div>
				<ul className="nav__list">
					{NAV_DATA.map(n => {
						return (
							showItem(n) &&
						<li className="nav__item" key={n.text}>
							<NavLink
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
		</header>
	);
};

export default withRouter(Navigation);
