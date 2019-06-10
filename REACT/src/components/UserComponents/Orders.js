import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';
const images = require.context('../../img', true);


const User = (props) => {

  const [user, setUser] = useContext(UserContext);

  const handleOpenDetails = (e) => {
    const dataButton = e.target.getAttribute("data-button");
    let detailToOpen = document.getElementById(dataButton);
    console.log(detailToOpen);

    detailToOpen.className == "orders-row-active" ? detailToOpen.className = "orders-row" :
      detailToOpen.className = "orders-row-active"


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
            <div className="card-header">My Orders</div>
            <div className="card-body">

              <div class="form-group">

                <button class="form-control  card-details-button" data-button="card-1" onClick={handleOpenDetails} >
                  <p data-button="card-1"> Order nº: 2345623</p>
                  <p style={{ fontSize: "12px" }}> Order date: 12/23/2019</p>
                  <i className="fa fa-chevron-down " data-button="card-1" disabled></i>
                </button>
                

                <div className="row orders-row " id="card-1">

                  <div className="orders-product-row" >
                    <div className="col-sm-12 col-md-12 col-lg-8 col-12 row orders-product-title">
                      <img src={images(`./${"f12019.jpg"}`)} alt="..." class="img-responsive orders-product-image" />
                      <div>
                        <p> Aquí va el juego amegos</p>
                        <p> Platforms: {"xbox"}</p>
                      </div>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-2 col-6">
                      <h6> Total</h6>
                      <p class="">{"xd"}$</p>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-2 col-6">
                      <h6> State</h6>
                      <p class="">Dineros$</p>
                    </div>
                  </div>

                  <div className="orders-product-row">
                    <div className="col-sm-12 col-md-12 col-lg-8 col-12 row orders-product-title">
                      <img src={images(`./${"f12019.jpg"}`)} alt="..." class="img-responsive orders-product-image" />
                      <div>
                        <p> Aquí va el juego amegos</p>
                        <p> Platforms: {"xbox"}</p>
                      </div>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-2 col-6">
                      <h6> Total</h6>
                      <p class="">{"xd"}$</p>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-2 col-6">
                      <h6> State</h6>
                      <p class="">Dineros$</p>
                    </div>
                  </div>
                </div>
                

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>




  )


}



export default User;
