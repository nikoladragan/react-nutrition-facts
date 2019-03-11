import React, { useReducer, createContext } from 'react';

const UserDataContext = createContext();

const initialState = {};

const reducer = (state, action) => {
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
	const [userState, userDispatch] = useReducer(reducer, initialState);
	const value = {userState, userDispatch};

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
