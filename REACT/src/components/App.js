/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import '../../node_modules/react-bootstrap/dist/react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../fontawesome-free/css/all.css';

import {useContext,useState,useEffect} from 'react';
import Header from './MainComponents/Header'
import Main from './MainComponents/Main'
import Categories from './Products/Categories'
import { Container } from 'react-bootstrap'
import './App.css';
import { UserContext, UserReducer } from './UserDispatch';



const App = () => {


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


export default App;
