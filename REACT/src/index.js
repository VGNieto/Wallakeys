import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './components/App'
import Users from './components/users'
import * as serviceWorker from './serviceWorker';
import Header from './components/Header';
import User from './components/User';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route exact path="/user/view" component={User} />
      </div>
    </Router>
  )


ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
