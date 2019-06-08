/* eslint-disable no-unused-vars */

import '../../node_modules/react-bootstrap/dist/react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../fontawesome-free/css/all.css';

import './App.css';
import React, { useContext} from 'react';
import { Route, BrowserRouter as Router, Redirect, Link } from 'react-router-dom'

import { UserContext, UserReducer } from './UserDispatch';
import { CartContext, CartReducer } from './CartDispatch';


import User from './UserComponents/User';
import WishList from './UserComponents/WishList';
import Cart from './UserComponents/Cart';
import Password from './UserComponents/Password';
import PhoneNumber from './UserComponents/PhoneNumber'
import Orders from './UserComponents/Orders'

import Products from './Products/Products';
import Product from './Products/Product';
import Test from './Test';
import Main from './MainComponents/Main'
import Header from './MainComponents/Header';
import Footer from './MainComponents/Footer'
import Checkout from './UserComponents/Checkout'

function  App () {

  const [user,setUser] = useContext(UserContext);


  

  const PrivateRoute = ({component: Component,...rest}) => {
          const isAuth = sessionStorage.getItem('token_id');
          return (
              <Route
                  {...rest}
                  render={props =>
                      isAuth ? (
                          <Component {...props} {...rest} />
                      ) : (
                              <Redirect
                                  to={{
                                      pathname: "/",
                                  }}
                              />
                          )
                      }
              />
          );
      }

    return (


        <Router>
          <div>

          <UserReducer>
            <CartReducer>
              <Header />
              
              <Route exact path="/" component={Main} />

                    
                <PrivateRoute path="/account/account-details" component={User} />
                <PrivateRoute path="/account/password" component={Password} />
                <PrivateRoute path="/account/phone-number" component={PhoneNumber} />
                <PrivateRoute path="/account/orders" component={Orders} />
                <PrivateRoute exact path="/account/cart" component={Cart} />
                <PrivateRoute exact path="/account/cart/checkout" component={Checkout} />


              <PrivateRoute path = "/wishlist" component={WishList} />
              
              <Route exact path= "/platform/:id" component={Products} />
              <Route exact path = "/products" component={Products} />
              <Route exact path="/product/:id" component={Product} />
              <PrivateRoute exact path="/test" component={Test} />

              <Footer />
            </CartReducer>
          </UserReducer>
          </div>

      </Router>


    )

}


export default App;
