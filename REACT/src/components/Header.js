
import React, { Component } from 'react';
import logo from './logo.png';
import { Navbar, Row, Col, Form, FormControl, Button, Container } from '../../node_modules/react-bootstrap/'

import './App.css';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: "rgb(24, 24, 24)" }} className="d-flex align-items-center" variant="dark">
          <Container   >

            <Row noGutters="true" style={{ flexGrow: 1 }}>

              <Col xs={12} sm={6} md={6} lg={6} xl={6} className="d-flex justify-content-center justify-content-sm-start justify-content-lg-start justify-content-xl-start" >
                <Navbar.Brand href="#home">
                  <img
                    alt=""
                    src={logo}
                    width="200"
                    className="d-inline-block"

                  />
                </Navbar.Brand>
              </Col>



              <Col xs={12} sm={6} md={6} lg={6} xl={6} className="d-none d-sm-block d-md-block d-lg-block d-xl-block  "  >
                <Form inline className="float-lg-right" style={{ margin: 5 }}>
                  <FormControl type="text" placeholder="Buscar..." className="mr-sm-2" />
                  <Button variant="outline-primary" >Buscar</Button>
                </Form>
              </Col>

            </Row>

          </Container>

        </Navbar>


        <Navbar style={{ backgroundColor: "#212121", borderTop: "1px solid gray" }} variant="dark">
          <Container  >



          </Container>

        </Navbar>
      </div>


    )
  }

}

export default Header