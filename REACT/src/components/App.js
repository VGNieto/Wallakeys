/* eslint-disable no-unused-vars */

import '../../node_modules/react-bootstrap/dist/react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../fontawesome-free/css/all.css';

import './App.css';
import React, { useContext, useReducer,useEffect} from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

import { UserContext, UserReducer } from './UserDispatch';
import User from './UserComponents/User';
import WishList from './UserComponents/WishList';
import Cart from './UserComponents/Cart';
import Products from './Products/Products';
import Product from './Products/Product';
import Test from './Test';
import Main from './MainComponents/Main'
import Header from './MainComponents/Header';


function  App () {

  const [user,setUser] = useContext(UserContext);


  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      user.token != null ? <Component {...props} /> : <Redirect to='/' />
  
    )} />
  )

    return (


        <Router>
          <div>

          <UserReducer>
            <Header />

            <Route exact path="/" component={Main} />
          
            <PrivateRoute path="/user/:id" component={User} />
            <PrivateRoute  path = "/wishlist" component={WishList} />
            <PrivateRoute exact path = "/cart" component={Cart} />
            
            <Route exact path= "/platform/:id" component={Products} />
            <Route exact path = "/products" component={Products} />
            <Route exact path="/product/:id" component={Product} />
            <PrivateRoute exact path="/test" component={Test} />
    
          </UserReducer>
          </div>

      </Router>


    )

}


export default App;
