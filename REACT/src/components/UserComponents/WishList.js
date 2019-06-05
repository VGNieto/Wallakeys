import React, { useContext } from 'react';
import 'react-bootstrap/dist/react-bootstrap'

import {UserContext} from '../UserDispatch';


const  User = (props) => {


    const [user,setUser] = useContext(UserContext);

    


    return (
      <div>
        <h1>tonto</h1>
       

      </div>


    );
  

}



export default User;
