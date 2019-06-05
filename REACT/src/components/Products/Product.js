import React,{useContext,useEffect,useState} from 'react';
/* eslint-disable no-unused-vars */

import Header from '../MainComponents/Header'
import Main from '../MainComponents/Main'

import { UserContext, UserReducer } from '../UserDispatch';
import axios from 'axios';



const Product = (props) =>{

    const [user,setUser] = useContext(UserContext);
    const [game,setGame] = useState(null);
    console.log(props)


    useEffect(() => {
      
      axios({
        method:"get",
        url: 'http://localhost:8080/api/product/info',
        params:{
          productID:props.match.params.id,
        }
      }).then(res =>{

        setGame(res.data);


      })



    }, [])


    return (
      <div>

        {game!=null ? <h1> {game[0].name}</h1>:null}

      </div>


    );


}

export default Product;