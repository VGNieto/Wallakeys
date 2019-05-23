import React from 'react'
import axios from 'axios';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      games: []
    }

  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/products',
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTc3MzQyMTYsImV4cCI6MTU1NzczNzgxNiwianRpIjoiMmVqTENpNFN5a1VGOWJRUlM3eHpEMyIsInN1YiI6bnVsbCwidXNlcl9pZCI6bnVsbH0.chDr0LKZAsUba4bIPMgtLsUCrBPrrWWLUFVVm8ED608"
      }
    })
      .then(res => {

        let data = (res.data);
        if (data !== null) {
          data.map((product) => {
            product.product_categories = JSON.parse(product.product_categories);
            product.product_platforms = JSON.parse(product.product_platforms);
            product.product_minimum_requeriments = JSON.parse(product.product_minimum_requeriments);
            product.product_recommended_requeriments = JSON.parse(product.product_recommended_requeriments);
            product.product_languages = JSON.parse(product.product_languages);
          })
          console.log(data);
          this.setState({ games: data });
        }
      });
  }



  render() {
    return (
      <div>
        <h1>{`/r/Welcome to my account`}</h1>
        <ul>
          {this.state.games.map(game =>
            <li key={game.product_name}>{game.product_categories}</li>

          )}

        </ul>

      </div>
    );
  }
}
export default Users