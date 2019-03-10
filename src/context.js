import React, { useReducer, createContext } from 'react';

const UserDataContext = createContext();

const initialState = {
	profileSetUp: true,
	name: 'Nikola',
	age: 29,
	gender: 'female',
	weight: 80,
	height: 183,
	activity: 5,
	goal: 2,
	calories: 0
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'update':
			return {...state, [action.property]: action.data};
		default:
			return state;
	}
};

const UserDataProvider = props => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {state, dispatch};

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
