import React, { useContext } from 'react';
import 'react-bootstrap/dist/react-bootstrap'

import {UserContext} from '../UserDispatch';
import Header from '../MainComponents/Header';
import Main from '../MainComponents/Main'

const  Cart = (props) => {

  const [user,setUser] = useContext(UserContext);

    return (
      <div>
        <h1>CARRITO</h1>
        
      </div>


    );
  

}



export default Cart;
