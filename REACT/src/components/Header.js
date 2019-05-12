
import React, { Component } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container ,ListGroup} from '../../node_modules/react-bootstrap/'
import Login from './Login'
import logo from '../img/logo.png';
import './App.css';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
    }

  }

  changeLogin = () => {
    this.setState({ loginModal: !this.state.loginModal })
  }

  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: "rgb(24, 24, 24)",borderBottom: "1px solid gray"}} className="d-flex align-items-center" variant="dark">
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
                
                <div  className="float-lg-right d-flex justify-content-center" style={{ margin: 5 }}>
                  <FormControl type="text" placeholder="Search..." />
                  <Button variant="outline-primary" className="ml-2" >Search</Button>
                  {this.props.token_id == "false" ? <Login loginModal={this.state.loginModal} handleLogged={this.props.handleLogged} /> : 
                
                <Button variant="btn btn-warning" style={{ marginLeft: "10px" }} onClick={this.props.logout}> Logout </Button> }
                </div>


              </Col>

            </Row>

          </Container>

        </Navbar>


      </div>


    )
  }

}

export default Header