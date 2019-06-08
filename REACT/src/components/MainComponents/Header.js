/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container } from '../../../node_modules/react-bootstrap/'
import Login from './Login'
import logo from '../../img/logo.png';
import { UserContext } from '../UserDispatch';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartDispatch';

const Header = () => {


  const [loginModal, setLoginModal] = useState(false)
  const [user, dispatch] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);


  const changeLogin = () => {
    setLoginModal(!loginModal)
  }

  const handleLogout = () => {
    dispatch({ type: 'logout' });
  }

  const totalProducts = () =>{
    let total = 0;
    console.log(cart.items);
    cart.items.forEach((element) => {
      total = total + element.quantity;
    }) 
    return total;
  }

console.log(cart.items.length);
  return (
    <div>
      <Navbar style={{ backgroundColor: "#1b2327", borderBottom: "1px solid gray" }} className="d-flex align-items-center" variant="dark">
        <Container   >

          <Row noGutters="true" style={{ flexGrow: 1 }}>

            <Col xs={12} sm={12} md={4} lg={4} xl={4} className="d-flex justify-content-center justify-content-lg-start justify-content-xl-start" >
              <Link to="/">
                <Navbar.Brand style={{margin:"0px"}}>
                  <img
                    alt=""
                    src={logo}
                    width="200"
                    className="d-inline-block"

                  />
                </Navbar.Brand>
              </Link>

            </Col>



            <Col xs={12} sm={12} md={8} lg={8} xl={8}  >

              <div className="float-lg-right right-nav" >
                 
                <input type="text" placeholder=" Search..." style={{marginTop:"13px",height:"30px" }} />
                <Button variant="outline-primary" style={{marginTop:"10px"}} className="ml-2" >Search</Button>

                <div className="navbar-buttons">
                  {user.token == null ?
                    null
                    :
                    <Link to={'/account/account-details'}><Button variant="btn btn-primary" style={{ marginLeft: "10px" }} > <i className="fa fa-user"></i> My Profile </Button> </Link>
                  }


                  {user.token == null ?
                    null
                    :
                    <Link to={'/account/cart'}><Button variant="btn btn-primary" style={{ marginLeft: "10px" }} > <i className="fa fa-shopping-cart"></i> Cart: {totalProducts()}</Button> </Link>
                  }


                  {user.token == null ?
                    <Login loginModal={loginModal} changeLogin={changeLogin} />

                    :

                    <Button variant="btn btn-primary" style={{ marginLeft: "10px" }} onClick={handleLogout}>Logout  <i className="fa fa-sign-out-alt"> </i> </Button>
                  }

                </div>

              </div>








            </Col>

          </Row>

        </Container>

      </Navbar>


    </div>


  )

}

export default Header