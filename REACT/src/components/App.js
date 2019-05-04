import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import Categories from './Categories'
import {Container} from 'react-bootstrap'
import './App.css';
import '../../node_modules/react-bootstrap/dist/react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

class App extends Component {


  constructor(){
    super();
    this.state={
      isLogged: false,
    }
  }

  componentDidMount(){
    
    let myItem = sessionStorage.getItem("isLogged");
    this.setState({isLogged: myItem})
  }

  handleLogged = (val) =>{
    this.setState({isLogged:val})
  }

  logout = () => {
    this.setState({isLogged:false});
    sessionStorage.removeItem("isLogged");
  }


  
  render() {
    return (
        <div>
          
          
          <Header isLogged={this.state.isLogged } handleLogged={this.handleLogged} logout={this.logout}/>
          <Categories />
          <Main  />
          
        </div>
        
      
    );
  }

  
}



export default App;
