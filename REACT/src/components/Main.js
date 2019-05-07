import React, { Component } from 'react';
import axios from 'axios';
import {Container,Row,Col, Breadcrumb} from 'react-bootstrap';
import Categories from './Categories'
import Carousel from './Carousel'
import Filters from './Filters'
import Breadcrumbs from './Breadcrumbs'
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
            <div className="main-section">
             
                <Categories />
                <Container>
                    <Carousel />
                    <Row className="top-section">
                        <Col xs={12}>
                            <Breadcrumbs />
                        </Col>
                        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Filters />
                        </Col>
                    </Row>
                </Container>
               
                
              
            </div>
        )
    }

}

export default Main