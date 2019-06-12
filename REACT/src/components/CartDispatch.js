/* eslint-disable */
import React, { useReducer, createContext, useEffect } from 'react';


export const CartContext = createContext();

export const CartReducer = (props) => {

    const initialState = {
        items: [],
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'initialCheck':
                state.items = action.text;
                return { items: action.text }
            case 'add':

                let exists = false;
                state.items.forEach(element => {
                    if (element.id == action.text.id) {
                        element.quantity = action.text.quantity;
                        element.subtotal = (element.quantity * element.price).toFixed(2);
                        exists = true;
                        return;
                    } else {

                    }
                });
                if (!exists) {
                    state.items = [...state.items, action.text]
                    localStorage.setItem("cart", JSON.stringify(state.items));
                    return { items: [...state.items] };
                } else {
                    localStorage.setItem("cart", JSON.stringify(state.items));
                    return { items: [...state.items] }
                }
                return;
            case 'addOne':
                state.items.map(element => {
                    if (element.id == action.text.id) {
                        element.quantity = action.text.quantity;
                        element.subtotal = (element.quantity * element.price).toFixed(2);
                    }
                    
                });

                localStorage.setItem("cart", JSON.stringify(state.items));
                return { items: [...state.items] }
            case 'removeOne':
                state.items.forEach(element => {
                    if (element.id == action.text.id) {
                        element.quantity = action.text.quantity;
                        element.subtotal = (element.quantity * element.price).toFixed(2);
                        return;
                    } else {

                    }
                });

                localStorage.setItem("cart", JSON.stringify(state.items));
                return { items: [...state.items] }

            case 'remove':

                state.items = state.items.filter((element) => {
                    return element.id != action.text.id;
                })
                localStorage.setItem("cart", JSON.stringify(state.items));
                return { items: [...state.items] }
            case 'removeCart':
                
                state.items = [];
                localStorage.removeItem("cart");
                return {items: state.items}
            default:
                throw new Error();


        }
    }
    const [cart, setCart] = useReducer(reducer, initialState);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart !== null) { setCart({ type: 'initialCheck', text: cart }) }
        
    }, []);


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );


}

