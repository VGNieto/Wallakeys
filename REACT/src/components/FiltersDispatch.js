import React, { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';

export const FiltersContext = createContext();

export const FiltersReducer = (props) => {

    const initialState = {
        filters: {},
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'changeFilters':
                state.filters = action.filters;
                return {filters: state.filters}
            
            default:
                throw new Error();


        }
    }
    const [filters, setFilters] = useReducer(reducer, initialState);

    

    return (
        <FiltersContext.Provider value={[filters, setFilters]}>
            {props.children}
        </FiltersContext.Provider>
    );


}

