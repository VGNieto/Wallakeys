/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container } from '../../../node_modules/react-bootstrap/'
import Login from './Login'
import logo from '../../img/logo.png';
import { UserContext } from '../UserDispatch';
import { Link } from 'react-router-dom';

const Footer = () => {


    const [loginModal, setLoginModal] = useState(false)
    const [user, dispatch] = useContext(UserContext);



    const changeLogin = () => {
        setLoginModal(!loginModal)
    }

    const handleLogout = () => {
        dispatch({ type: 'logout' });
    }


    return (
        <div style={{ paddingTop: "50px" }} className="footer">
            <footer>
               

                <div class="container">
                    <ul class="footer-links">
                        <li><a href="http://webenlance.com">Home</a></li>
                        <li><a href="http://webenlance.com">About</a></li>
                        <li><a href="http://webenlance.com">Services</a></li>
                        <li><a href="http://webenlance.com">Pricing</a></li>
                        <li><a href="http://webenlance.com">Blog</a></li>
                        <li><a href="http://webenlance.com">Contact</a></li>
                    </ul>
                    <p class="center-align">Copyright @2019 | Designed With by VCZ CODE</p>

                    <ul class="social_footer">
                        <li><a href="http://webenlance.com"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="http://webenlance.com"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="http://webenlance.com"><i class="fab fa-linkedin"></i></a></li>
                        <li><a href="http://webenlance.com"><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>

            </footer>

        </div >


    )

}

export default Footer