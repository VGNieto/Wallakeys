

import React, { Component } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container, ListGroup } from '../../node_modules/react-bootstrap/'
import './App.css';


import origin from '../img/origin.png'
import psn from '../img/psn.png'
import battle from '../img/battle.png'
import test from '../img/test.jpg';
import test1 from '../img/test1.jpg';
import test2 from '../img/test2.jpg';


class Carousel extends Component{
    render(){
        return(
            <div id="carouselExampleSlidesOnly" className="carousel slide p-top-10" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={test} className=" item-img"  alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={test1} className="item-img" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={test2} className="item-img" alt="..."/>
                    </div>
                    
                </div>
            </div>
        )
    }
}


export default Carousel;