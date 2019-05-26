import React, { Component } from 'react';
import axios from 'axios';
import {Container,Row,Col, Breadcrumb} from 'react-bootstrap';
import Categories from '../Products/Categories'
import Carousel from './Carousel'
import Filters from '../Products/Filters'
import Breadcrumbs from './Breadcrumbs'
import Games from '../Products/Products'
import { CategoriesProvider } from '../CategoriesContext';


const Main = () => {


    

    return (
        <div className="main-section">
        <CategoriesProvider>

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
            
        </CategoriesProvider>
            
            
        </div>
    )

}

export default Main