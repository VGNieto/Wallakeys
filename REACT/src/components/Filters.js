
import React, { Component } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container, ListGroup } from '../../node_modules/react-bootstrap/'
import './App.css';

class Filters extends Component {

    constructor() {
        super();
        this.state = {

        }
    }




    render() {
        return (
            <div className="accordion filters-bar" id="accordionExample">
                <div className="card">
                    <div className="card-group-item" >
                        <div className="card-header  d-flex justify-content-center">
                            <span className=""><strong>Filter games</strong></span>
                        </div>
                    </div>

                    <div className="card-group-item"  >
                        <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

                            <span className="float-left">Platform</span>
                            <span className="d-flex justify-content-end"><i className="fas fa-angle-down "></i></span>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>

                    <div className="card-group-item">
                        <div className="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <span className="float-left">Categories</span>
                            <span className="d-flex justify-content-end"><i className="fas fa-angle-down "></i></span>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" >
                            <div className="card-body">
                            </div>
                        </div>
                    </div>

                    <div className="card-group-item">
                        <div className="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <span className="float-left">Price</span>
                            <span className="d-flex justify-content-end"><i className="fas fa-angle-down "></i></span>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" >
                            <div className="card-body">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Min</label>
                                        <input type="number" class="form-control" id="inputEmail4" placeholder="$0"/>
                                    </div>
                                    <div class="form-group col-md-6 text-right">
                                        <label>Max</label>
                                        <input type="number" class="form-control" placeholder="$1,0000"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        )
    }
}

export default Filters