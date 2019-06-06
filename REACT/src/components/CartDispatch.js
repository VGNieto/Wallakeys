import React, { useReducer,createContext,useEffect } from 'react';


export const CartContext = createContext();

export const CartReducer = (props) => {

    const initialState = {
        items:{}
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'add':
                return {};
            case 'remove':
                
                return {token:null,expires:null}
            default:
                throw new Error();
        }
    }
    const [cart, dispatch] = useReducer(reducer, initialState);

   
    return (
        <CartContext.Provider value={[cart, dispatch]}>
            {props.children}
        </CartContext.Provider>
    );


}

