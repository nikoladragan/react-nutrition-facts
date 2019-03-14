import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import AdminPage from './pages/admin';
import ProfilePage from './pages/profile';
import Navigation from './components/navigation';
import OverviewPage from './pages/overview';
import { AuthContext } from './context/authContext';
import { validate } from './services/userService';
import NoAccess from './components/noAccess';
import { UserDataContext } from './context/userDataContext';


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
					console.log('validate', res);
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
	}, []);

	return (
		<div className="root" style={css}>
			<header className="header">
				<Navigation />
			</header>
			<main className="main">
				<Switch>
					<Route path="/home" component={HomePage}></Route>
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
