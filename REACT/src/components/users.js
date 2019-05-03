import React from 'react'
import axios from 'axios';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          users: []
        }
        
      }

      componentDidMount(){
        axios.get('http://localhost:8888/api/users')
        .then(res => {
            this.setState({ users:res.data  });
        });
        }
    
      render() {
  
        return (
          <div>
            <h1>{`/r/Welcome to my account`}</h1>
            <ul>
              {this.state.users.map(user =>
                <li key={user.email}>{user.username}</li>
              )}
            
            </ul>
           
          </div>
        );
      }
}
export default Users