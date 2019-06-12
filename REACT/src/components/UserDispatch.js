/* eslint-disable */
import React, { useReducer,createContext,useEffect } from 'react';


export const UserContext = createContext();

export const UserReducer = (props) => {

    const initialState = {
        token: null,
        expires: null,
        oid: null,
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'login':
                return {token: action.text.token,expires: action.text.expires, oid:action.text.oid };
            case 'logout':
                localStorage.clear();
                return {token:null,expires:null}
            default:
                throw new Error();
        }
    }
    const [user, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const myItem = localStorage.getItem("token_id");
        if (myItem !== null) { dispatch({ type: 'login', text: JSON.parse(myItem) })    }
        
    }, []);



    return (
        <UserContext.Provider value={[user, dispatch]}>
            {props.children}
        </UserContext.Provider>
    );


}

