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
        axios({
          method: 'get',
          url: 'http://localhost:8080/api/products',
          headers: {
              "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTc2OTMyMjYsImV4cCI6MTU1NzY5NDEyNiwianRpIjoiNFdqQUNsMndDa2pvM3RFSHJxUDVVeCIsInN1YiI6bnVsbCwidXNlcl9pZCI6bnVsbH0.J6Y_9mXHRS7S8Un25IrVM5y8VhFHvzWgZ_bbRYJZqUY"
          }
        })
      .then(res => {
          
          let data = (res.data);
          if(data!==null){

            data = data.map((product) =>{
              Object.entries(product).map((item) =>{
                console.log(typeof item[0])
              })
            })
           /*  data[0].product_categories = JSON.parse(data[0].product_categories);
            data[0].product_platforms = JSON.parse(data[0].product_platforms);
            data[0].product_minimum_requeriments = JSON.parse(data[0].product_minimum_requeriments);
            data[0].product_recommended_requeriments = JSON.parse(data[0].product_recommended_requeriments);
            data[0].product_languages = JSON.parse(data[0].product_languages); */
          }
            
          
      });      }
      

    
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