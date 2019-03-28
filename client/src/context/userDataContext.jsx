import React, { useReducer, createContext } from 'react';

const UserDataContext = createContext();

const initialState = {};

const reducerX = (state, action) => {
	switch (action.type) {
		case 'setInitialData':
			return {
				...state,
				...action.data
			};
		default:
			return state;
	}
};

const UserDataProvider = props => {
	const [ state, dispatch ] = useReducer(reducerX, initialState);
	const value = { state, dispatch };

	return (
		<UserDataContext.Provider value={value}>
			{props.children}
		</UserDataContext.Provider>
	);
};

const UserDataConsumer = UserDataContext.Consumer;

export {
	UserDataContext,
	UserDataProvider,
	UserDataConsumer
};
