import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {Button,ButtonGroup,Dropdown,DropdownButton, Container} from 'react-bootstrap';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
    
  }
  componentDidMount(){
    axios.get('http://wallaze.local/ajax')
    .then(res => {
        const postss = res.data;
        console.log(postss);
        console.log(window.location.hostname)
        this.setState({ posts:postss  });
    });
    }

  render() {
  
    

    return (
      
        <Container>
          <h1>{`WHAT IS DIS`}</h1>
          <ul>
            {this.state.posts.map(post =>
              <li key={post.id}>{post.title}</li>
            )}
          
          </ul>
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">Left</Button>
                <Button variant="secondary">Middle</Button>
                <Button variant="secondary">Right</Button>
              </ButtonGroup>
        </Container>
      
    );
  }
}

export default App;
