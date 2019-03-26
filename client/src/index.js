import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserDataProvider } from './context/userDataContext';
import { AuthProvider } from './context/authContext';
import { MenuProvider } from './context/menuContext';
import { NotificationProvider } from './context/notificationContext';

const app =
	<BrowserRouter>
		<AuthProvider>
			<UserDataProvider>
				<MenuProvider>
					<NotificationProvider>
						<App></App>
					</NotificationProvider>
				</MenuProvider>
			</UserDataProvider>
		</AuthProvider>
	</BrowserRouter>
;

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
