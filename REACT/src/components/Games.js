

import React, { Component } from 'react';
import './App.css';
import '../fontawesome-free/css/all.css';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import blackops3 from '../img/blackops3.jpg'
import nfs from '../img/nfs.jpg';
import sims from '../img/sims.jpg'
import skyrim from '../img/skyrim.jpg';
class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render_games = () => {
        return (
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="product-grid3">
                    <div class="product-image3">
                        <a href="#">
                            <img class="pic-1" src={blackops3}/>
                        </a>
                        <ul class="social">
                            <li><a href="#"><i class="fa fa-shopping-bag"></i></a></li>
                            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                        <span class="product-new-label">New</span>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Call of Duty Black Ops 3</a></h3>
                        <div class="price">
                            $63.50
                            <span>$75.00</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="product-grid3">
                    <div class="product-image3">
                        <a href="#">
                            <img class="pic-1" src={nfs}/>
                        </a>
                        <ul class="social">
                            <li><a href="#"><i class="fa fa-shopping-bag"></i></a></li>
                            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Need for Speed</a></h3>
                        <div class="price">
                            $43.50
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="product-grid3">
                    <div class="product-image3">
                        <a href="#">
                            <img class="pic-1" src={skyrim}/>
                        </a>
                        <ul class="social">
                            <li><a href="#"><i class="fa fa-shopping-bag"></i></a></li>
                            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                        <span class="product-new-label">New</span>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">The Elder Scrolls V: Skyrim</a></h3>
                        <div class="price">
                            $63.50
                            <span>$75.00</span>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="product-grid3">
                    <div class="product-image3">
                        <a href="#">
                            <img class="pic-1" src={sims}/>
                        </a>
                        <ul class="social">
                            <li><a href="#"><i class="fa fa-shopping-bag"></i></a></li>
                            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                        <span class="product-new-label">New</span>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">Los Sims 4</a></h3>
                        <div class="price">
                            $63.50
                            <span>$75.00</span>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        )


    }

    render() {
        return (


            this.render_games()



        )
    }
}

export default Games





