import React from 'react'
import axios from 'axios';

class Users extends React.Component {

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
            <h1>{`/r/Welcome to my account`}</h1>
            <ul>
              {this.state.posts.map(post =>
                <li key={post.id}>{post.title}</li>
              )}
            
            </ul>
           
          </div>
        );
      }
}
export default Users