/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';


const Password = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [result, setResult] = useState();
  const [spinnerTimeOut, setSpinnerTimeOut] = useState();
  const [savedTimeOut, setSavedTimeOut] = useState();

  const handleOldValue = (e) => {
    setOldPassword(e.currentTarget.value);
  }

  const handleNewValue = (e) => {
    setNewPassword(e.currentTarget.value);
  }

  const showResult = () => {

    if (result == true) {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "green" }}>Password updated</p>
      )
    } else if (result == false) {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}>Incorrect password</p>
      )
    } else {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}></p>

      )
    }

  }

  const saveChanges = (e) => {
    const token = 'Bearer ' + user.token;
    let spinner = document.getElementById("loading-spinner");
    let savedchanges = document.getElementById("saved-changes");
    spinner.className = "";
    savedchanges.className = "d-none";

    clearTimeout(spinnerTimeOut);
    clearTimeout(savedTimeOut);

    axios({
      method: 'post',
      url: window.location.origin+':443/api/user/updatepassword',
      headers: {
        Authorization: token,

      },
      params: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      }
    }).then(res => {
      setResult(res.data);

      setSpinnerTimeOut(setTimeout(() => {
        savedchanges.className = "";
        spinner.className = "d-none";
        setSavedTimeOut(setTimeout(() => {
          savedchanges.className = "d-none";
        }, 2000))
      }, 1000))

    });

  }


  return (
    <div className="container">
      <div className="row justify-content-center" style={{ paddingTop: "25px" }}>

        <div className="col-md-4">
          <div className="card card-header text-primary">Account Dashboard</div>

          <div className="list-group">

            <div className="list-group-item"><i className="fa fa-user"></i> <span> <Link to="/account/account-details"> <span>Account Details </span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-phone"></i> <span> <Link to="/account/phone-number"> <span>Phone Number</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-key"></i> <span> <Link to="/account/password"> <span>Password</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-credit-card"></i> <span> <Link to="/account/payment"> <span>Payment Method</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-book-open"></i> <span> <Link to="/account/orders"> <span>My Orders</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-heart"></i> <span> <Link to="/account/wishlist"> <span>Wishlist</span></Link> </span></div>

          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Change Password</div>
            <div className="card-body">
              <form action="" method="">
                <div className="form-group row">
                  <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">Actual Password</label>
                  <div className="col-md-6">
                    <input type="text" id="actual_password" onChange={handleOldValue} className="form-control" name="actual_password" required autoFocus />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="new_password" className="col-md-4 col-form-label text-md-right">New Password</label>
                  <div className="col-md-6">
                    <input type="password" id="new_password" onChange={handleNewValue} className="form-control" name="new_password" required />
                  </div>
                </div>




                <div className="col-md-6 offset-md-4 center-align" style={{ alignItems: "center" }}>
                  <button type="button" className="btn btn-primary" onClick={saveChanges}>
                    Save Changes
                          </button>
                  <div id="loading-spinner" className="d-none" style={{ padding: "10px" }}>
                    <div className="spinner-border d-flex justify-content-center " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                  {showResult()}
                </div>


              </form>
            </div>
          </div>
        </div>


      </div>
    </div>

  )


}



export default Password;
