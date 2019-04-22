import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import './App.css';
import '../../node_modules/react-bootstrap/dist/react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

  render() {
    return (
        <div>
          <Header />
          <Main  />
        </div>
        
      
    );
  }

  
}



export default App;
