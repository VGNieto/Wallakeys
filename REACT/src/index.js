import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import { UserContext, UserReducer } from './components/UserDispatch';


import './index.css';
import App from './components/App'
import User from './components/UserComponents/User';
import WishList from './components/UserComponents/WishList';
import Cart from './components/UserComponents/Cart';
import Products from './components/Products/Products';
import Product from './components/Products/Product';

import Test from './components/Test';


function CheckUser(props) {


  const [user, dispatch] = useContext(UserContext);
  return user;

}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    CheckUser == null ? <Component {...props} /> : <Redirect to='/' />

  )} />
)


const routing = (
  <Router>
    <div>
      <UserReducer>
        
        <Route exact path="/" component={App} />
        <PrivateRoute exact path="/user/view:id" component={User} />
        <PrivateRoute exact path = "/user/:id/wishlist" component={WishList} />
        <PrivateRoute exact path = "/user/:id/cart" component={Cart} />
        <Route exact path= "/platform/:id" component={Products} />
        <Route exact path = "/products" component={Products} />
        <Route exact path="/product/:id" component={Product} />
        <PrivateRoute exact path="/test" component={Test} />

      </UserReducer>
    </div>
  </Router>
)


ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
