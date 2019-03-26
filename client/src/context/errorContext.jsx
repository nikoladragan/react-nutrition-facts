import React, { useReducer, createContext } from 'react';

const ErrorContext = createContext();

const initialState = [];

const reducer = (state, action) => {
	let array = null;
	switch (action.type) {
		case 'addNewError':
			return [ ...state, action.data ];
		case 'removeError':
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

const ErrorProvider = props => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return (
		<ErrorContext.Provider value={value}>
			{props.children}
		</ErrorContext.Provider>
	);
};

const ErrorConsumer = ErrorContext.Consumer;

export {
	ErrorContext,
	ErrorProvider,
	ErrorConsumer
};
