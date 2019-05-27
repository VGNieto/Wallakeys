/* eslint-disable no-unused-vars */
import React, { useState,useContext } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import {UserContext} from '../UserDispatch';

const Login = (props) =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [user,dispatch] = useContext(UserContext);

    function handleLogin(data) {
      dispatch({ type: 'login', text: data });
    }
  

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
     }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
     }

    const sendLogin = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/login',
            params: {
                email:email,
                password: password
            }
          })
        .then(res => {
            
            let data = (res.data);
            if(data!==false){   
                console.log(data);
                handleLogin(data);   
                sessionStorage.setItem("token_id", JSON.stringify(data));
                
            }
        });
    }

    
    return (
        <div className="dropdown">
            
            <Button variant="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginLeft: "10px" }} onClick={props.changeLogin}> Login </Button>

        <div className="dropdown-menu dropdown-menu-right login-panel " data-display="static" aria-labelledby="dropdownMenuButton">
            
                <div className="card-body" >
                    <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>

                    
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fas fa-user"></i> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Email" type="email"
                                value={email} onChange={handleEmailChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fas fa-lock"></i> </span>
                                </div>
                                <input className="form-control" placeholder="******" type="password" 
                                value={password} onChange={handlePasswordChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button onClick={sendLogin} className="btn btn-primary btn-block"> Login  </button>
                        </div>
                        <p className="text-center"><a href="#?" className="btn">Forgot password?</a></p>
                        <p className="text-center"><a href="#?" className="btn">Don't you have account? Register </a></p>

                
                </div>
            
        </div>

        
        </div>
        

    )
}

    export default Login