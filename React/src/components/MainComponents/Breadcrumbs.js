/* eslint-disable */
import React, {useState,useContext} from 'react';
import { Col} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {FiltersContext} from './../FiltersDispatch' ;


const Breadcrumbs = () => {

    const [game,setgame] = useState(window.location.pathname.split("/").pop().split("-").join(" ").toUpperCase())

    return (

        <div className="breadcrumb-container breadcrumb">

            <Col xs={12} sm={8} className="d-flex align-self-center justify-content-xs-center">
                <li className="breadcrumb-item active"><Link to="">Home</Link></li>
                <li className="breadcrumb-item active"><Link to="/">Products</Link></li>
                {!window.location.pathname.search("/product/") ?
                    <li className="breadcrumb-item active" aria-current="page"><Link to={window.location.pathname.split("/").pop()}>{game}</Link></li> : null
                }
            </Col>
            <Col xs={12} sm={12} md={4} className="d-flex justify-content-end">

                
            </Col>

        </div>
        
    )



}

export default Breadcrumbs