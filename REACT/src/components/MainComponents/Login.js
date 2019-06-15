/* eslint-disable */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import { UserContext } from '../UserDispatch';

const Login = (props) => {

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");

    const [register, setRegister] = useState(false);

    const [user, dispatch] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");

    const [emailErrorLogin,setEmailErrorLogin] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handleLogin(data) {
        dispatch({ type: 'login', text: data });
    }


    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }

    const handleChange = (e) => {
        switch (e.currentTarget.name) {
            case "emailLogin": setEmailLogin(e.currentTarget.value);
                                validateEmail(e.currentTarget.value,"login");
                break;
            case "passwordLogin": setPasswordLogin(e.currentTarget.value);
                break;
            case "emailRegister": setEmailRegister(e.currentTarget.value);
                                    validateEmail(e.currentTarget.value,"register");

                break;
            case "passwordRegister": setPasswordRegister(e.currentTarget.value);
                            validatePassword(e.currentTarget.value);
                break;

        }
    }

    const handleRegister = () => {
        setRegister(!register)
    }

    const validateEmail = (e,field) => {
        let reg = /\S+@\S+\.\S+/;
        
        if(field=="register"){
            if (e.length == 0) { setEmailError(""); setEmailError("") } else {
                if (!reg.test(e)) { setEmailError("is-invalid"); } else { setEmailError(""); }
            }
        } else{
            if (e.length == 0) { setEmailErrorLogin(""); setEmailErrorLogin("") } else {
                if (!reg.test(e)) { setEmailErrorLogin("is-invalid"); } else { setEmailErrorLogin(""); }
            }
        }
        return reg.test(e);
    }

    const validatePassword = (e) =>{
        
        let reg = /^(?=.*\d).{4,8}$/;
        if (e.length == 0) { setPasswordError("");  } else {
            if (!reg.test(e)) { setPasswordError("is-invalid");  } else { setPasswordError(""); }
        }
        return reg.test(e);
    }

    const validateAll = () =>{

        
       return passwordError=="" && emailError=="" && passwordRegister.length>0 && emailRegister.length>0; 

    }

    const sendRegister = () => {
        axios({
            method: 'post',
            url: 'https://api.imviczz.com/api/user/register',
            params: {
                email: emailRegister,
                password: passwordRegister
            }
        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {
                    console.log(data);
                    document.getElementById("loading-spinner").className = "center-align";
                    setTimeout(() => {
                        handleLogin(data);
                        localStorage.setItem("token_id", JSON.stringify(data));
                        window.location.href = "/";emailErrorLogin

                    }, 500)

                }
            });
    }
    const sendLogin = () => {
        axios({
            method: 'post',
            url: 'https://api.imviczz.com/api/user/login',
            params: {
                email: emailLogin,
                password: passwordLogin
            }
        })
            .then(res => {
                document.getElementById("loading-spinner").className = "center-align";

                let data = (res.data);
                if (data !== false) {
                    setTimeout(() => {
                        handleLogin(data);
                        localStorage.setItem("token_id", JSON.stringify(data));
                        window.location.href = "/";

                    }, 500)


                } else {

                    setTimeout(() => {
                        document.getElementById("loading-spinner").className = "d-none";
                        setErrorMessage("Wrong user or password!")

                    }, 500)

                }
            });
    }


    return (
        <div >


            <div className="modal fade " id="login-overlay" role="dialog">

                <div id="login-overlay" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4> Login to Wallakeys</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>

                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="well">
                                        {register == false ?
                                            <form>

                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fas fa-user"></i> </span>
                                                            <input name="" className={"form-control " + emailErrorLogin} placeholder="Email" name="emailLogin" type="email"
                                                            value={emailLogin} onChange={handleChange} />
                                                        </div>
                                                        {emailErrorLogin != "" ? <p className="text-danger" style={{display:"block",margin:"auto"}}>Invalid e-mail</p> : null}

                                                    </div>

                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fas fa-lock"></i> </span>
                                                            <input className="form-control" placeholder="******" name="passwordLogin" type="password"
                                                            value={passwordLogin} onChange={handleChange} />
                                                        </div>
                                                       
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
                                                {errorMessage != "" ? <p className="text-danger" style={{display:"block",margin:"auto"}}>{errorMessage}</p> : null}
                                            </form>
                                            :
                                            <form>

                                                <div className="form-group">
                                                    <div className="input-group">


                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fas fa-user"></i> </span>
                                                            <input name="" className={"form-control " + emailError} placeholder="New Email" name="emailRegister" type="text"
                                                                value={emailRegister} onChange={handleChange} />
                                                        </div>

                                                        {emailError != "" ? <p className="text-danger" style={{display:"block",margin:"auto"}}>Invalid e-mail</p> : null}


                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"> <i className="fas fa-lock"></i> </span>
                                                            <input className={"form-control " + passwordError} placeholder="New Password" name="passwordRegister" type="password"
                                                            value={passwordRegister} onChange={handleChange} />
                                                        </div>
                                                        {passwordError != "" ? <p className="text-danger" style={{display:"block",margin:"auto"}}>Password must contain 4-8 characters and atleast 1 number</p> : null}

                                                    </div>

                                                </div>
                                                <div className="form-group">
                                                    {validateAll() ? <button onClick={sendRegister} type="button" className="btn btn-primary btn-block"> Register  </button>
                                                        :
                                                        
                                                        <button  type="button" className="btn btn-primary btn-block" disabled> Register  </button>} 
                                                </div>

                                                <div className="center-align d-none" id="loading-spinner">
                                                    <div className="spinner-border d-flex justify-content-center " role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div></form>}
                                    </div>
                                </div>
                                {register == false ?
                                <div className="col-sm-6">
                                    <p >Register now for <span className="text-success">FREE</span></p>
                                    <ul className="list-unstyled" style={{ lineHeight: "2" }}>
                                        <li><span className="fa fa-check text-success"></span> See all your orders</li>
                                        <li><span className="fa fa-check text-success"></span> Save your favorites</li>
                                        <li><span className="fa fa-check text-success"></span> Fast checkout</li>
                                    </ul>
                                    <button onClick={handleRegister} className="btn btn-info horizontal-align">Register now!</button>
                                </div>
                                :
                                <div className="col-sm-6">
                                    <p >Already have account?  <span className="text-success">LOGIN</span></p>
                                    
                                    <button onClick={handleRegister} className="btn btn-info horizontal-align ">Login!</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>


    )
}

export default Login