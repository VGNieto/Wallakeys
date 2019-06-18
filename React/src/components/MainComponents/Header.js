/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container } from '../../../node_modules/react-bootstrap/'
import Login from './Login'
import logo from '../../img/logo.png';
import { UserContext } from '../UserDispatch';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartDispatch';
import { GamesContext } from '../GamesDispatch';
import axios from 'axios';
const Header = () => {


  const [loginModal, setLoginModal] = useState(false)
  const [user, dispatch] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const [games,setGames] = useContext(GamesContext);
  const [search,setSearch] = useState();

  const changeLogin = () => {
    setLoginModal(!loginModal)
  }

  const handleSearch = (e) =>{
    setSearch(e.target.value);
    searchGame(e.target.value);

  }
  const handleLogout = () => {
    dispatch({ type: 'logout' });
    window.location.href="/"
  }

  const totalProducts = () =>{
    let total = 0;
      cart.items.forEach((element) => {
        total = total + element.quantity;
      }) 
    return total;
  }

  const searchGame=(game)=>{

    axios({
      method: 'get',
      url: 'https://api.imviczz.com/api/product/search',
      params:{
        search: game
      }
    })
      .then(res => {

        let data = (res.data);
        if (data !== false) {
          setGames(
            { type: "addGames", games: data }
        );       
       }
        });
  }


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
                 
                <input type="text" placeholder=" Search..." className="form-control" onChange={handleSearch} style={{marginTop:"13px",height:"30px",width:"300px" }} />

                <div className="navbar-buttons">
                  {user.token == null ?
                    null
                    :
                    <Link to={'/account/account-details'}><Button variant="btn btn-primary" style={{ marginLeft: "10px" }} > <i className="fa fa-user"></i> My Profile </Button> </Link>
                  }


                  {user.token == null ?
                    null
                    :
                    <Link to={'/account/cart'}><Button variant="btn btn-primary" style={{ marginLeft: "10px" }} > <i className="fa fa-shopping-cart"></i> Cart {totalProducts()}</Button> </Link>
                  }


                  {user.token == null ?
                    <Button variant="btn btn-warning dropdown-toggle" type="button" href="#" data-toggle="modal" data-target="#login-overlay" style={{ marginLeft: "10px" }}> Login </Button>


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