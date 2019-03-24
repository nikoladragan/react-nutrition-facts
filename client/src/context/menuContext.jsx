import React, { useReducer, createContext } from 'react';

const MenuContext = createContext();

const initialState = false;

const reducer = (state, action) => {
	console.log(state, action);
	switch (action.type) {
		case 'setMenuState':
			return action.data;
		default:
			return state;
	}
};

const MenuProvider = props => {
	const [ menuState, menuDispatch ] = useReducer(reducer, initialState);
	const value = { menuState, menuDispatch };

	return (
		<MenuContext.Provider value={value}>
			{props.children}
		</MenuContext.Provider>
	);
};

const MenuConsumer = MenuContext.Consumer;

export {
	MenuContext,
	MenuProvider,
	MenuConsumer
};
