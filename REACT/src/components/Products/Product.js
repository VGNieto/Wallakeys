import React,{useContext} from 'react';
/* eslint-disable no-unused-vars */
import Header from '../MainComponents/Header'
import Main from '../MainComponents/Main'

import { UserContext, UserReducer } from '../UserDispatch';



const Product = () =>{

    const [user,setUser] = useContext(UserContext);



    return (
      <div>
        <UserReducer>
          <Header token_id={user.token} />
        </UserReducer>
        <Main token_id={user.token} />

      </div>


    );


}

export default Product;