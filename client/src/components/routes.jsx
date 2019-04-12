import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/authContext';
import { validate } from '../services/userService';
import { UserDataContext } from '../context/userDataContext';
import { getFood } from '../fake';

import HomePage from '../containers/home';
import RegisterPage from '../containers/register';
import LoginPage from '../containers/login';
import AdminPage from '../containers/admin';
import ProfilePage from '../containers/profile';
import OverviewPage from '../containers/overview';
import WelcomePage from '../containers/welcome';

import NoAccess from './noAccess';

const Routes = () => {
	const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
	const { state: userState, dispatch: userDispatch } = useContext(UserDataContext);
	const isAuth = authState.isAuthenticated;
	const isProfileSetUp = userState.profileSetUp;
	const isAdmin = authState.isAdmin;

	useEffect(() => {
		const ls = localStorage.getItem('app-token');
		if (ls) {
			validate({ token: ls })
				.then(res => {
					authDispatch({
						type: 'setAuth',
						data: {
							auth: true,
							admin: res.user.isAdmin
						}
					});

					userDispatch({
						type: 'setInitialData',
						data: res.user.data
					});
				})
				.catch(err => {
					console.log('error', err);
				});

		}

		getFood();
	}, [ authDispatch, isAdmin, userDispatch ]);

	const handleLoginRender = () => {
		if (!isAuth) {
			return <LoginPage />;
		} else if (isAuth) {
			if (isProfileSetUp) {
				return <Redirect to="/home" />;
			} else {
				return <Redirect to="/profile" />;
			}
		}
	};

	return (
		<Switch>
			<Route path="/" exact
				render={() => isAuth ? <Redirect to="/home" /> : <WelcomePage />}></Route>
			<Route path="/home" component={isAuth ? HomePage : NoAccess}></Route>
			<Route exact path="/profile" component={isAuth ? ProfilePage : NoAccess}></Route>
			<Route exact path="/overview" component={isAuth ? OverviewPage : NoAccess}></Route>
			<Route exact path="/admin" component={isAdmin ? AdminPage : NoAccess}></Route>
			<Route exact path="/login"
				render={handleLoginRender}></Route>
			<Route exact path="/register"
				render={() => isAuth ? <Redirect to="/home" /> : <RegisterPage />}></Route>
		</Switch>
	);
};

export default Routes;
