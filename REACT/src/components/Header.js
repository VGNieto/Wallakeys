import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    }

  }

  render() {
    return (
        <div>
          <h1> tonto</h1>
          
        </div>
    )
  }

}

export default Header