import React, { Component } from 'react';
import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap';
class Main extends Component {

    constructor(props) {

        super(props);
        this.state = {
            posts: [],
        }
        
    }

    componentDidMount(){
        
        axios({
            method: 'get',
            url: 'http://localhost:8888/api/users',
          })
        .then(res => {
            
            let data = (res.data);
            this.setState({ posts:  data });
        });
    }

    

    render() {
        return (
            <div> 
                <Container className="main-section">
                  
                </Container>
              
            </div>
        )
    }

}

export default Main