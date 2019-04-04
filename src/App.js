import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
    
  }
  componentDidMount(){
    axios.get('http://'+window.location.hostname+'/ajax')
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
      </div>
    );
  }
}

export default App;
