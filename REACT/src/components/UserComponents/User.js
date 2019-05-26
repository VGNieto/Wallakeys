import React, { Component,useContext,useEffect } from 'react';
import 'react-bootstrap/dist/react-bootstrap'

import { Container } from 'react-bootstrap'
import {UserContext} from '../UserDispatch';


const  User = () => {

  const [user,setUser] = useContext(UserContext);

    console.log(user);
    return (
      <div>
      </div>


    );
  

}



export default User;
