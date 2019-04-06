import React from 'react';
import Navigation from './components/navigation';
import NotificationComponent from './components/notification';
import Routes from './components/routes';

function App() {
	const css = {
		height: `${window.innerHeight}px`
	};

	return (
		<div className="root" style={css}>
			<Navigation />
			<main className="main">
				<Routes />
			</main>
			<NotificationComponent />
		</div>
	);
}

export default App;
