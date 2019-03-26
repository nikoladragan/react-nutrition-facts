import React, { useReducer, createContext } from 'react';
import { generateId } from '../helpers/helpers';

const NotificationContext = createContext();

const initialState = [];

const reducer = (state, action) => {
	let array = null;
	switch (action.type) {
		case 'addNewNotification':
			action.data.id = generateId();
			return [ ...state, action.data ];
		case 'removeNotification':
			array = state.filter(s => s.id !== action.data);
			return array;
		case 'activateTimer':
			// console.log('activateTimer', action.data);
			array = action.data.map(s => {
				s.timerActivated = true;
				return s;
			});
			// console.log('after mutate', action.data, array);
			return state;
		default:
			return state;
	}
};

const NotificationProvider = props => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return (
		<NotificationContext.Provider value={value}>
			{props.children}
		</NotificationContext.Provider>
	);
};

const NotificationConsumer = NotificationContext.Consumer;

export {
	NotificationContext,
	NotificationProvider,
	NotificationConsumer
};
