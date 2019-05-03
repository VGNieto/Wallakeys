
import React, { Component } from 'react';
import { Navbar, Row, Col, Form, FormControl, Button, Container } from '../../node_modules/react-bootstrap/'
import './App.css';
import '../fontawesome-free/css/all.css';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }

    }

    checkLogin = () => {
        
        return this.props.loginModal == true ?  "card" :  "card d-none";
    
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
     }
     handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
     }

    sendLogin = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/api/user/login',
            params: {
                email:this.state.email,
                password: this.state.password
            }
          })
        .then(res => {
            
            let data = (res.data);
            if(data===true){
                this.props.handleLogged(data);
                sessionStorage.setItem("isLogged", 'true');
            }
        });
    
    }

    render() {

        return (
            <div className={this.checkLogin()}>
                
                <article className="card-body" >
                    <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>

                    
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fas fa-user"></i> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Email" type="email"
                                value={this.state.email} onChange={this.handleEmailChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fas fa-lock"></i> </span>
                                </div>
                                <input className="form-control" placeholder="******" type="password" 
                                value={this.state.password} onChange={this.handlePasswordChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button onClick={this.sendLogin} className="btn btn-primary btn-block"> Login  </button>
                        </div>
                        <p className="text-center"><a href="#" className="btn">Forgot password?</a></p>
                        <p className="text-center"><a href="#" className="btn">Don't you have account? Register </a></p>

                
                </article>
            </div>


        )

    }


}

    export default Login