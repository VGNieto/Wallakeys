import React, { useReducer, createContext, useEffect } from 'react';


export const CartContext = createContext();

export const CartReducer = (props) => {

    const initialState = {
        items: [],
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'initialCheck':
                    return { items: action.text }

            case 'add':

                let exists = false;
                state.items.forEach(element => {
                    console.log(element.id);
                    if (element.id == action.text.id) {
                        element.quantity++;
                        element.subtotal = (element.quantity * element.price).toFixed(2);
                        exists = true;
                        return;
                    } else {

                    }
                });
                if (!exists) {
                    sessionStorage.setItem("cart", JSON.stringify(state.items));
                    return { items: [...state.items, action.text] };
                } else {
                    sessionStorage.setItem("cart", JSON.stringify(state.items));
                    return { items: [...state.items] }
                }
            case 'addOne':
                console.log(action.text)
                state.items.forEach(element => {
                    console.log(element.id);
                    if (element.id == action.text.id) {
                        element.quantity++;
                        element.subtotal = (element.quantity * element.price).toFixed(2);
                        return;
                    } else {

                    }
                });

                sessionStorage.setItem("cart", JSON.stringify(state.items));
                return { items: [...state.items] }
            case 'removeOne':
                state.items.forEach(element => {
                    console.log(element.id);
                    if (element.id == action.text.id) {
                        element.quantity = element.quantity-1;
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
            case 'loadData':
                    loadData();
                    return;

            default:
                throw new Error();

            
        }
    }
    const [cart, setCart] = useReducer(reducer, initialState);

    useEffect(() => {
        const cart = sessionStorage.getItem("cart");
        if (cart !== null) { setCart({type:'initialCheck',text: JSON.parse(cart)})} 
        
    }, []);

    const loadData = () =>{
        const cart = sessionStorage.getItem("cart");
        if (cart !== null) { setCart({type:'initialCheck',text: JSON.parse(cart)})} 
        
    }


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );


}

