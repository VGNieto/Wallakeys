import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Button, ButtonToolbar } from 'react-bootstrap';

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
      <div>
        <h1>{`/r/Saludaciones`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        
        </ul>
        <ButtonToolbar>
                <Button variant="danger"> Hago cosas</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default App;
