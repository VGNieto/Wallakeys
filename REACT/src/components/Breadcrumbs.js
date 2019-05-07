import React, { Component } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container, ListGroup } from '../../node_modules/react-bootstrap/'
import './App.css';

class Breadcrumbs extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render(){
        return(

            <div className="breadcrumb-container breadcrumb">
               
                        <Col xs={12} xm={8} className="d-flex align-self-center justify-content-xs-center">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Page</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Page</li>
                       
                   
                        </Col>
                        <Col xs={12} sm={12} md={4} className="d-flex justify-content-end">

                                    <select class="form-control">
                                        <option value="0" selected disabled>Order by</option>
                                        <option value="1">Featured</option>
                                        <option value="2">Most popular</option>
                                        <option value="3">Top rated</option>
                                        <option value="4">Most commented</option>
                                    </select>
                               
                        </Col>
                        
                    
              
                
            </div>






        )
    }


}

export default Breadcrumbs