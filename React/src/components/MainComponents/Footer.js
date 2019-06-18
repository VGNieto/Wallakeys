/* eslint-disable */
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
               

                <div className="container">
                    <ul className="footer-links">
                        <li><a href="https://www.imviczz.com">Home</a></li>
                        <li><a href="https://www.imviczz.com">About</a></li>
                        <li><a href="https://www.imviczz.com">Products</a></li>
                        <li><a href="https://www.imviczz.com">Cookies and Privacy</a></li>
                        <li><a href="https://www.imviczz.com">Contact</a></li>
                    </ul>
                    <p className="center-align">Copyright @2019 | Designed With by VCZ CODE</p>

                    <ul className="social_footer">
                        <li><a href="https://www.imviczz.com"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://www.imviczz.com"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="https://www.imviczz.com"><i className="fab fa-linkedin"></i></a></li>
                        <li><a href="https://www.imviczz.com"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>

            </footer>

        </div >


    )

}

export default Footer