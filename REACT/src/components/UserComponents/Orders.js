import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';


const User = (props) => {

  const [user, setUser] = useContext(UserContext);






  return (

    <div className="container">
      <div className="row justify-content-center" style={{ paddingTop: "25px" }}>

        <div className="col-md-4">
          <div className="list-group">

            <div className="list-group-item"><i className="fa fa-user"></i> <span> <Link to="/account/account-details"> <span>Account Details </span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-phone"></i> <span> <Link to="/account/phone-number"> <span>Phone Number</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-key"></i> <span> <Link to="/account/password"> <span>Password</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-book-open"></i> <span> <Link to="/account/orders"> <span>My Orders</span></Link> </span></div>

          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">My Orders</div>
            <div className="card-body">
              
            </div>
          </div>
        </div>

      </div>
    </div>




  )


}



export default User;
