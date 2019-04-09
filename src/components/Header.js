import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {Button,ButtonGroup,Dropdown,DropdownButton, Container} from 'react-bootstrap';

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
         title:'',
        }
        
      }
      
      render() {
        return (
          <div>
            <h1> Sean bienvenidos</h1>
          </div>
        )
      }

}

export default Header