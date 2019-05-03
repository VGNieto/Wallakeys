
import React, { Component } from 'react';
import logo from './logo.png';
import { Navbar, Row, Col, Form, FormControl, Button, Container } from '../../node_modules/react-bootstrap/'
import Login from './Login'
import './App.css';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
    }

  }

  changeLogin = () =>{
    this.setState({ loginModal: !this.state.loginModal })
  }

  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: "rgb(24, 24, 24)" }} className="d-flex align-items-center" variant="dark">
          <Container   >

            <Row noGutters="true" style={{ flexGrow: 1 }}>

              <Col xs={12} sm={12} md={5} lg={6} xl={6} className="d-flex justify-content-center justify-content-lg-start justify-content-xl-start" >
                <Navbar.Brand href="#">
                  <img
                    alt=""
                    src={logo}
                    width="200"
                    className="d-inline-block"

                  />
                </Navbar.Brand>
              </Col>



              <Col xs={12} sm={12} md={7} lg={6} xl={6} className="d-flex justify-content-center d-md-block d-lg-block d-xl-block  "  >
                
                  <Form inline className="float-lg-right d-flex justify-content-center" style={{ margin: 5 }}>
                    <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
                    <Button variant="outline-primary" >Search</Button>
                    {!this.props.isLogged ? <Button variant="btn btn-warning" style={{marginLeft:"10px"}} onClick={this.changeLogin}> Login </Button> :
                    <Button variant="btn btn-warning" style={{marginLeft:"10px"}} onClick={this.props.logout}> Logout </Button> }
                    
                  </Form>
                
               
              </Col>

            </Row>

          </Container>

        </Navbar>


        <Navbar style={{ backgroundColor: "#212121", borderTop: "1px solid gray" }} variant="dark">
          <Container  >



          </Container>

        </Navbar>

        <Container >
          <Row>
            <Col xl={8} lg={7} md={6}></Col>
            <Col xs={12} sm={12} xl={4} lg={5} md={6} className="float-right">
            {!this.props.isLogged ? <Login loginModal={this.state.loginModal} handleLogged={this.props.handleLogged} /> :null }
            </Col>
          </Row>
        </Container>

      </div>


    )
  }

}

export default Header