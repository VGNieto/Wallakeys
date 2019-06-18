/* eslint-disable */
import React, { useReducer,createContext,useEffect } from 'react';


export const OrderContext = createContext();

export const OrderReducer = (props) => {

    const initialState = {
        order:"",
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'initialCheck':
                state.order = action.text;
                return { order: state.order}
            case 'createOrder':
                state.order = action.text;
                localStorage.setItem("order", JSON.stringify(state.order));
                return {order: state.order};
            
            default:
                throw new Error();
        }
    }
    const [order, setOrder] = useReducer(reducer, initialState);
    useEffect(() => {
        const order = JSON.parse(localStorage.getItem("order"));
        if (order !== null) { setOrder({ type: 'initialCheck', text: order }) }
        
    }, []);
    return (
        <OrderContext.Provider value={[order, setOrder]}>
            {props.children}
        </OrderContext.Provider>
    );


}

