import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './components/App'
import Users from './components/users'
import * as serviceWorker from './serviceWorker';
import Header from './components/Header';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
      </div>
    </Router>
  )


ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
