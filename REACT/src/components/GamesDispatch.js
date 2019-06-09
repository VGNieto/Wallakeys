import React, { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';

export const GamesContext = createContext();

export const GamesReducer = (props) => {

    const initialState = {
        items: [],
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'addGames':
                state.items = action.games;
                return {items: state.items}
            
            default:
                throw new Error();


        }
    }
    const [games, setGames] = useReducer(reducer, initialState);

    

    return (
        <GamesContext.Provider value={[games, setGames]}>
            {props.children}
        </GamesContext.Provider>
    );


}

