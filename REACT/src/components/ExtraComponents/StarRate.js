/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
const images = require.context('../../img', true);


const StarRate = (props) => {


    const showStars = () => {
        return (
            <div className="container">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
            </div>
        )
    }


    return (

        showStars()
    );


}



export default StarRate;
