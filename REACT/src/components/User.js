import React, { Component } from 'react';
import '../../node_modules/react-bootstrap/dist/react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './Header'
import Main from './Main'
import Categories from './Categories'
import { Container } from 'react-bootstrap'
import './App.css';


class User extends Component {


  constructor() {
    super();
    this.state = {
      token_id: {
        "token": "false",
        "expires": "false",
      },
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    let myItem = sessionStorage.getItem("token_id");

    if (myItem !== null) { return { token_id: JSON.parse(myItem) } }
    else {return null;}

  }


  checkLogged = () => {
    if (this.state.token_id.expires < Math.floor(new Date().getTime() / 1000)) {
      this.setState({ token_id: false });
      return false;
    }
    return true;
  }

  handleLogged = (val) => {
    this.setState({ token_id: val })
  }

  logout = () => {
    this.setState({ token_id: {"token": "false",
    "expires": "false",} });
    sessionStorage.removeItem("token_id");
  }



  render() {
    console.log(this.state.token_id);
    return (
      <div>
        <Header token_id={this.state.token_id.token} handleLogged={this.handleLogged} logout={this.logout} />

      </div>


    );
  }


}



export default User;
