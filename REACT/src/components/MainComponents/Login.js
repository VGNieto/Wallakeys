/* eslint-disable */
import React, { useState,useContext } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import {UserContext} from '../UserDispatch';

const Login = (props) =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [register,setRegister] = useState(false);

    const [user,dispatch] = useContext(UserContext);

    function handleLogin(data) {
      dispatch({ type: 'login', text: data });
    }
  

    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
     }
    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
     }

    const handleRegister = () =>{
        setRegister(!register)
    }

    const sendRegister = () =>{
        axios({
            method: 'post',
            url: window.location.origin+':443/api/user/register',
            params: {
                email:email,
                password: password
            }
          })
        .then(res => {
            
            let data = (res.data);
            if(data!==false){   

                document.getElementById("loading-spinner").className="center-align";
                setTimeout(() => {
                    handleLogin(data);   
                    localStorage.setItem("token_id", JSON.stringify(data));
                },500)
                    
                 
                
               
            }
        });
    }
    const sendLogin = () => {
        axios({
            method: 'post',
            url: window.location.origin+':443/api/user/login',
            params: {
                email: email,
                password: password
            }
          })
        .then(res => {
            document.getElementById("loading-spinner").className="center-align";

            let data = (res.data);
            if(data!==false){   
                setTimeout(()=>{
                    handleLogin(data);   
                    localStorage.setItem("token_id", JSON.stringify(data));
                    window.location.reload();

                },500)
               
                
            }
        });
    }

    
    return (
        <div className="dropdown">
            
            <Button variant="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginLeft: "10px" }} onClick={props.changeLogin}> Login </Button>

        <div className="dropdown-menu dropdown-menu-right login-panel " data-display="static" aria-labelledby="dropdownMenuButton">
            <form>
            {register == false ?
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
                            <button onClick={sendLogin} type="button" className="btn btn-primary btn-block"> Login  </button>
                        </div>
                        <div className="center-align d-none" id="loading-spinner"> 
                        <div className="spinner-border d-flex justify-content-center " role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        </div>
                        <button type="button" className="btn btn-light btn-block" onClick={handleRegister}>Don't you have account? Register </button>

                
                </div>
                    :
                <div className="card-body" >
                    <h4 className="card-title text-center mb-4 mt-1">Register</h4>

                    
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fas fa-user"></i> </span>
                                </div>
                                <input name="" className="form-control" placeholder="New Email" type="text"
                                value={email} onChange={handleEmailChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fas fa-lock"></i> </span>
                                </div>
                                <input className="form-control" placeholder="New Password" type="password" 
                                value={password} onChange={handlePasswordChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button onClick={sendRegister} type="button" className="btn btn-primary btn-block"> Register  </button>
                        </div>

                        <div className="center-align d-none" id="loading-spinner"> 
                        <div className="spinner-border d-flex justify-content-center " role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        </div>

                        <button type="button" className="btn btn-light btn-block" onClick={handleRegister}>Already have account? Login </button>

                
                </div>
            }
            </form>

        </div>

        
        </div>
        

    )
}

    export default Login