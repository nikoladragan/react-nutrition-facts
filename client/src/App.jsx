import React, { useContext } from 'react';
import Navigation from './components/navigation';
import NotificationComponent from './components/notification';
import Routes from './components/routes';
import { NotificationContext } from './context/notificationContext';

function App() {
	const { state: notificationState } = useContext(NotificationContext);
	const css = {
		height: `${window.innerHeight}px`
	};

	return (
		<div className="root" style={css}>
			<Navigation />
			<main className="main">
				<Routes />
			</main>
			{ notificationState.length > 0 && <NotificationComponent /> }
		</div>
	);
}

export default App;
