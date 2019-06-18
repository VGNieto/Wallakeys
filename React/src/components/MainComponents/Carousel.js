/* eslint-disable */

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import test from '../../img/test.jpg';
import test1 from '../../img/test1.jpg';
import test2 from '../../img/test2.jpg';


const Carousel = () => {
    return (
        <div className="carousel slide " data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={test} className=" item-img" alt="..." />
                </div>
                <div className="carousel-item">
                    <Link to="/product/grand-theft-auto-v:"><img src={test1} className="item-img" alt="..." /></Link>
                </div>
                <div className="carousel-item">
                    <img src={test2} className="item-img" alt="..." />
                </div>

            </div>
        </div>
    )
}


export default Carousel;
