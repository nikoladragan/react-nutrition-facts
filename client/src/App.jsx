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
// import { getFood } from './fake';
import WelcomePage from './containers/welcome';


function App() {
	const { authState, authDispatch } = useContext(AuthContext);
	const { userDispatch } = useContext(UserDataContext);
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
	}, []);

	return (
		<div className="root" style={css}>
			<header className="header">
				<Navigation />
			</header>
			<main className="main">
				<Switch>
					<Route path="/" exact component={WelcomePage}></Route>
					<Route path="/home" component={isAuth ? HomePage : NoAccess}></Route>
					<Route exact path="/profile" component={isAuth ? ProfilePage : NoAccess}></Route>
					<Route exact path="/overview" component={isAuth ? OverviewPage : NoAccess}></Route>
					<Route exact path="/admin" component={AdminPage}></Route>
					<Route
						exact
						path="/login"
						render={() => isAuth ? <Redirect to='/' /> : <LoginPage />}></Route>
					<Route
						exact
						path="/register"
						render={() => isAuth ? <Redirect to='/' /> : <RegisterPage />}></Route>
				</Switch>
			</main>
			<footer className="footer">footer</footer>
		</div>
	);
}

export default App;
