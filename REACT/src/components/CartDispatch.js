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
                    console.log(element.id);
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
                    sessionStorage.setItem("cart", JSON.stringify(state.items));
                    return { items: [...state.items] };
                } else {
                    sessionStorage.setItem("cart", JSON.stringify(state.items));
                    return { items: [...state.items] }
                }
                return;
            case 'addOne':
                state.items.map(element => {
                    console.log(element.id);
                    if (element.id == action.text.id) {
                        element.quantity = action.text.quantity;
                        element.subtotal = (element.quantity * element.price).toFixed(2);
                    }
                    
                });

                sessionStorage.setItem("cart", JSON.stringify(state.items));
                return { items: [...state.items] }
            case 'removeOne':
                state.items.forEach(element => {
                    console.log(element.id);
                    if (element.id == action.text.id) {
                        element.quantity = action.text.quantity;
                        element.subtotal = (element.quantity * element.price).toFixed(2);
                        return;
                    } else {

                    }
                });

                sessionStorage.setItem("cart", JSON.stringify(state.items));
                return { items: [...state.items] }

            case 'remove':

                state.items = state.items.filter((element) => {
                    return element.id != action.text.id;
                })
                sessionStorage.setItem("cart", JSON.stringify(state.items));
                return { items: [...state.items] }

            default:
                throw new Error();


        }
    }
    const [cart, setCart] = useReducer(reducer, initialState);

    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        if (cart !== null) { setCart({ type: 'initialCheck', text: cart }) }
        
    }, []);


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );


}

