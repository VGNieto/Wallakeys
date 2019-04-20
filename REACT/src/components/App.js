import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header'
import Main from './Main'
import {Container} from 'react-bootstrap';

class App extends Component {

  render() {
    return (
      
        <Container >
          <Header />
          <Main  />
        </Container>
      
    );
  }

  
}



export default App;
