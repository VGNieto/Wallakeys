import React, { Component } from 'react';
import axios from 'axios';
import {Container,Row,Col, Breadcrumb} from 'react-bootstrap';
import Categories from './Categories'
import Carousel from './Carousel'
import Filters from './Filters'
import Breadcrumbs from './Breadcrumbs'
import Games from './Games'


class Main extends Component {

    constructor(props) {

        super(props);
        this.state = {
            
        }
        
    }

    componentDidMount(){
        console.log(this.props.token_id);
        const token = "Bearer "+ this.props.token_id;
        console.log(token);
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/user',
            headers:{
              "Authorization": token,
            }
          })
        .then(res => {
            
            let data = (res.data);
        });
    }
    

    render() {
        return (
            <div className="main-section">
             
                <Categories />
                <Container style={{backgroundColor:"#ffffff"}}>
                    <Carousel />
                    <Row className="top-section">
                        <Col xs={12}>
                            <Breadcrumbs />
                        </Col>
                        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Filters />
                        </Col>
                        <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                            <Games />
                        </Col>
                    </Row>
                </Container>
               
                
              
            </div>
        )
    }

}

export default Main