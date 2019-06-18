/* eslint-disable */
import React, { Component,useContext,useState } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container, ListGroup } from '../../../node_modules/react-bootstrap/'
import { Redirect,Link } from 'react-router-dom'

import steam from '../../img/steam.png';
import uplay from '../../img/uplay.png';
import xbox from '../../img/xbox.png'
import origin from '../../img/origin.png'
import psn from '../../img/psn.png'
import battle from '../../img/battle.png'


const Categories = () => {

    return (
        <div>
        <Navbar style={{ backgroundColor: "#263238" }}variant="dark">
            <Container style={{justifyContent:"space-evenly"}}> 

                    <div className="categorie-span"> <img alt="" src={steam} className="logo-categories"></img> STEAM
                    </div>

                    <div className="categorie-span"> <img alt="" src={uplay} className="logo-categories"></img> UPLAY
                    </div>
                    <div className="categorie-span"> <img alt="" src={xbox} className="logo-categories"></img> XBOX
                    </div>
                    <div className="categorie-span"> <img alt="" src={origin} className="logo-categories"></img> ORIGIN
                    </div>
                    <div className="categorie-span"> <img alt="" src={psn} className="logo-categories"></img> PSN
                    </div>
                    <div className="categorie-span"> <img alt="" src={battle} className="logo-categories"></img> BATTLE
                    </div>

                    
                
            </Container>
        </Navbar>
        </div>
    );

}


export default Categories;
