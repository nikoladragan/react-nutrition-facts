import React, { useReducer, createContext } from 'react';

const AuthContext = createContext();

const initialState = {
	isAuthenticated: false
};

const reducer1 = (state, action) => {
	switch (action.type) {
		case 'setAuth':
			return {...state, isAuthenticated: action.data};
		default:
			return state;
	}
};

const AuthProvider = props => {
	const [authState, authDispatch] = useReducer(reducer1, initialState);
	const value = {authState, authDispatch};

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
};

const AuthConsumer = AuthContext.Consumer;

export {
	AuthContext,
	AuthProvider,
	AuthConsumer
};
