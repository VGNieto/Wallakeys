
import React, { Component } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container, ListGroup } from '../../node_modules/react-bootstrap/'
import './App.css';
import { Redirect } from 'react-router-dom'

import steam from '../img/steam.png';
import uplay from '../img/uplay.png';
import xbox from '../img/xbox.png'
import origin from '../img/origin.png'
import psn from '../img/psn.png'
import battle from '../img/battle.png'



class Categories extends Component {



    constructor() {
        super();
        this.state = {
            categories:[
                {}
            ]
        }
    }

    moveTo = (e) => {
        const link = "/categories/"+(e.target.innerText).trim();
        window.location=link;
    }

    render() {
        return (
            <div>
            <Navbar style={{ backgroundColor: "rgb(24, 24, 24)" }}variant="dark">
                <Container className="d-flex justify-content-center"> 
                    <Row>
                        <Col className="text-center">
                        <button className="categorie-span"> <i className="fas fa-th fa-lg" style={{position:"relative",top:"1px"}} /> ALL GAMES</button>
                        <button className="categorie-span" onClick={this.moveTo}> <img alt="" src={steam} className="logo-categories"></img> STEAM </button>
                        <button className="categorie-span"> <img alt="" src={uplay} className="logo-categories"></img> UPLAY </button>
                        <button className="categorie-span"> <img alt="" src={xbox} className="logo-categories"></img> XBOX </button>
                        <button className="categorie-span"> <img alt="" src={origin} className="logo-categories"></img> ORIGIN </button>
                        <button className="categorie-span"> <img alt="" src={psn} className="logo-categories"></img> PSN </button>
                        <button className="categorie-span"> <img alt="" src={battle} className="logo-categories"></img> BATTLE </button>

                        </Col>
                    </Row>
                   
                </Container>
            </Navbar>
            </div>
        );
    }

}


export default Categories;
