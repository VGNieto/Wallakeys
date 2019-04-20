import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header'
import Main from './Main'

class App extends Component {

  render() {
    return (
      
        <div className="container" >
          <Header />
          <Main  />
          </div>
      
    );
  }

  
}



export default App;
