import React, { useContext,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';


const Payment = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [cards, setCards] = useState([]);

  

  const handleNewMethod = (e) => {
    let form = document.getElementById("new-payment-method");
    form.className == "account-payment-active" ? form.className = "account-payment" : form.className = "account-payment-active"
  }

  const handleOpenDetails = (e) => {
    const dataButton = e.target.getAttribute("data-button");
    let detailToOpen = document.getElementById(dataButton);
    console.log(detailToOpen);

    detailToOpen.className == "order-details-active" ? detailToOpen.className = "order-details" : detailToOpen.className = "order-details-active"
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
            <div className="card-header">Payment Method</div>
            <div className="card-body">

              <div class="form-group">
                <button class="form-control  card-details-button" data-button="card-1" onClick={handleOpenDetails} >
                  <p data-button="card-1"> VISA terminated in 2345 </p>
                  <i className="fa fa-chevron-down " data-button="card-1" disabled></i>
                </button>
              </div>

              <div className="order-details" id="card-1">

                <div class="form-group">
                  <label for="username">Full name</label>
                  <span class="form-control" defaultValue=""> </span>
                </div>


                <div class="row">
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label><span class="hidden-xs">Expiration</span> </label>
                      <div class="input-group">
                        <span class="form-control" defaultValue="" name="month"> </span>
                        <span class="form-control" defaultValue="" name="year"> </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>





              <ul class="nav bg-light nav-pills rounded nav-fill mb-3 payment-methods" role="tablist">
                <li class="nav-item dropdown">
                  <button className="btn btn-primary" onClick={handleNewMethod}><i class="fa fa-credit-card"></i> Add new payment method</button> </li>
              </ul>





              <form role="form " className="account-payment" id="new-payment-method">
                <div class="form-group">
                  <label for="username">Full name</label>
                  <input type="text" class="form-control" name="username" placeholder="" required="" />
                </div>

                <div class="form-group">
                  <label for="cardNumber">Card number</label>
                  <div class="input-group">
                    <input type="text" class="form-control" name="cardNumber" placeholder="" />
                    <div class="input-group-append">
                      <span class="input-group-text text-muted">
                        <i class="fab fa-cc-visa"></i>   <i class="fab fa-cc-amex"></i>
                        <i class="fab fa-cc-mastercard"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label><span class="hidden-xs">Expiration</span> </label>
                      <div class="input-group">
                        <input type="number" class="form-control" placeholder="MM" name="" />
                        <input type="number" class="form-control" placeholder="YY" name="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV </label>
                      <input type="number" class="form-control" required="" />
                    </div>
                  </div>
                </div>
                <button class="subscribe btn btn-primary btn-block" type="button"> Confirm  </button>
              </form>

            </div>
          </div>
        </div>

      </div>
    </div>




  )


}



export default Payment;
