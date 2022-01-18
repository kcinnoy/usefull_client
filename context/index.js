import {useReducer, createContext} from 'react';

// initial state
const initialState =  {
    user: null,
};

// create context
const Context = createContext() 

// root recucer
const rootReducer = (state, actions) => {
    switch(actions.type) {
        case 'LOGIN':
            return {...StaticRange, user: action.payload};
        case 'LOGOUT':
            return {...state, user: null };
        default:
            return state;
    }
};

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    );
};

export {Context, Provider};