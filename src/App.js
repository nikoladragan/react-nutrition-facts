import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import AdminPage from './pages/admin';
import ProfilePage from './pages/profile';
import Navigation from './components/navigation';

function App() {
	const css = {
		height: `${window.innerHeight}px`
	};

	return (
		<div className="root" style={css}>
			<header className="header">
				<Navigation />
			</header>
			<main className="main">
				<Switch>
					<Route exact path="/" component={HomePage}></Route>
					<Route exact path="/profile" component={ProfilePage}></Route>
					<Route exact path="/admin" component={AdminPage}></Route>
					<Route exact path="/login" component={LoginPage}></Route>
					<Route exact path="/register" component={RegisterPage}></Route>
				</Switch>
			</main>
			<footer className="footer">footer</footer>
		</div>
	);
}

export default App;
