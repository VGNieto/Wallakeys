
import React, { Component } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container, ListGroup } from '../../node_modules/react-bootstrap/'
import './App.css';
import steam from './steam.png';
import uplay from './uplay.png';
import xbox from './xbox.png'
import origin from './origin.png'
import psn from './psn.png'
import battle from './battle.png'



class Categories extends Component {



    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
            <Navbar style={{ backgroundColor: "rgb(24, 24, 24)" }}variant="dark">
                <Container className="d-flex justify-content-center"> 
                    <Row>
                        <Col className="text-center">
                        <button className="categorie-span"> <i className="fas fa-th fa-lg" style={{position:"relative",top:"1px"}} /> ALL GAMES</button>
                        <button className="categorie-span"> <img src={steam} className="logo-categories"></img> STEAM </button>
                        <button className="categorie-span"> <img src={uplay} className="logo-categories"></img> UPLAY </button>
                        <button className="categorie-span"> <img src={xbox} className="logo-categories"></img> XBOX </button>
                        <button className="categorie-span"> <img src={origin} className="logo-categories"></img> ORIGIN </button>
                        <button className="categorie-span"> <img src={psn} className="logo-categories"></img> PSN </button>
                        <button className="categorie-span"> <img src={battle} className="logo-categories"></img> BATTLE </button>

                        </Col>
                    </Row>
                   
                </Container>
            </Navbar>
            </div>
        );
    }

}


export default Categories;
