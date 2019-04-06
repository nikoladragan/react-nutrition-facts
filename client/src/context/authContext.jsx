import React, { useReducer, createContext } from 'react';

const AuthContext = createContext();

const initialState = {
	isAuthenticated: false
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setAuth':
			return {
				...state,
				isAuthenticated: action.data.auth,
				isAdmin: action.data.admin
			};
		default:
			return state;
	}
};

const AuthProvider = props => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const value = { state, dispatch };

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
