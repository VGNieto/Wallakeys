import React, { useContext,useEffect } from 'react';
import 'react-bootstrap/dist/react-bootstrap'

import {UserContext} from '../UserDispatch';
import Header from '../MainComponents/Header';
import Main from '../MainComponents/Main'

const  User = (props) => {


    const [user,setUser] = useContext(UserContext);

    


    return (
      <div>
        <h1>tonto</h1>
       

      </div>


    );
  

}



export default User;
