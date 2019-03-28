import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './containers/home';
import RegisterPage from './containers/register';
import LoginPage from './containers/login';
import AdminPage from './containers/admin';
import ProfilePage from './containers/profile';
import Navigation from './components/navigation';
import OverviewPage from './containers/overview';
import { AuthContext } from './context/authContext';
import { validate } from './services/userService';
import NoAccess from './components/noAccess';
import { UserDataContext } from './context/userDataContext';
import { getFood } from './fake';
import WelcomePage from './containers/welcome';
import NotificationComponent from './components/notification';


function App() {
	const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
	const { dispatch: userDispatch } = useContext(UserDataContext);
	const isAuth = authState.isAuthenticated;
	const css = {
		height: `${window.innerHeight}px`
	};

	useEffect(() => {
		const ls = localStorage.getItem('app-token');
		if (ls) {
			validate({ token: ls })
				.then(res => {
					authDispatch({
						type: 'setAuth',
						data: true
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
	}, [ authDispatch, userDispatch ]);

	return (
		<div className="root" style={css}>
			<Navigation />
			<main className="main">
				<Switch>
					<Route
						path="/"
						exact
						render={() => isAuth ? <Redirect to="/home" /> : <WelcomePage />}></Route>
					<Route path="/home" component={isAuth ? HomePage : NoAccess}></Route>
					<Route exact path="/profile" component={isAuth ? ProfilePage : NoAccess}></Route>
					<Route exact path="/overview" component={isAuth ? OverviewPage : NoAccess}></Route>
					<Route exact path="/admin" component={AdminPage}></Route>
					<Route
						exact
						path="/login"
						render={() => isAuth ? <Redirect to="/home" /> : <LoginPage />}></Route>
					<Route
						exact
						path="/register"
						render={() => isAuth ? <Redirect to="/home" /> : <RegisterPage />}></Route>
				</Switch>
			</main>
			<NotificationComponent />
		</div>
	);
}

export default App;
