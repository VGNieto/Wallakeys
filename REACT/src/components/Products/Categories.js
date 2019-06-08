
import React, { Component,useContext,useState } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container, ListGroup } from '../../../node_modules/react-bootstrap/'
import { Redirect,Link } from 'react-router-dom'

import steam from '../../img/steam.png';
import uplay from '../../img/uplay.png';
import xbox from '../../img/xbox.png'
import origin from '../../img/origin.png'
import psn from '../../img/psn.png'
import battle from '../../img/battle.png'

import {CategoriesContext} from '../CategoriesContext';

const Categories = () => {

    const [categories,setCategories] = useContext(CategoriesContext);
    return (
        <div>
        <Navbar style={{ backgroundColor: "#263238" }}variant="dark">
            <Container className="d-flex justify-content-center categories"> 
                <Row>
                    <Col className="text-center">

                    <button className="categorie-span"> <i className="fas fa-th fa-lg" style={{position:"relative",top:"1px"}} />
                        <Link to="/products/all">ALL GAMES</Link>
                    </button>

                    <button className="categorie-span"> <img alt="" src={steam} className="logo-categories"></img> 
                        <Link to="/products/steam">STEAM</Link>
                    </button>

                    <button className="categorie-span"> <img alt="" src={uplay} className="logo-categories"></img> 
                        <Link to="/products/uplay">UPLAY</Link>
                    </button>
                    <button className="categorie-span"> <img alt="" src={xbox} className="logo-categories"></img>
                        <Link to="/products/xbox">XBOX</Link>
                    </button>
                    <button className="categorie-span"> <img alt="" src={origin} className="logo-categories"></img> 
                        <Link to="/products/origin">ORIGIN</Link>
                    </button>
                    <button className="categorie-span"> <img alt="" src={psn} className="logo-categories"></img> 
                        <Link to="/products/uplay">UPLAY</Link>
                    </button>
                    <button className="categorie-span"> <img alt="" src={battle} className="logo-categories"></img>
                        <Link to="/products/battle">BATTLE</Link>
                    </button>

                    </Col>
                </Row>
                
            </Container>
        </Navbar>
        </div>
    );

}


export default Categories;
