/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';
const images = require.context('../../img', true);


const User = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [orders, setOrders] = useState();

  const revealKey = (e) => {
    e.currentTarget.className = "d-none";
    e.currentTarget.previousElementSibling.className = "";
  }
  const handleOpenDetails = (e) => {

    const dataButton = e.currentTarget.getAttribute("data-button");
    let detailToOpen = document.getElementById(dataButton);

    detailToOpen.className == "orders-row-active" ? detailToOpen.className = "orders-row" :
    detailToOpen.className = "orders-row-active"
  }


  const showOrders = () => {
    return (
      <div>


        {orders.orders.map((element) =>
          <div className="form-group" key={element.id}>
            <button className="form-control  card-details-button" data-button={element.id} onClick={(e) => { handleOpenDetails(e) }} >
              <p data-button="card-1"> {"Order nº" + element.id}</p>
              <p style={{ fontSize: "12px" }}> {"Order date:" + element.date}</p>
              <i className="fa fa-chevron-down " data-button="card-1" disabled></i>
            </button>
            <div className="row orders-row " id={element.id}>

              {element.games.map((game) =>

                <div className="orders-product-row" key={game.id}>
                  <div className="col-sm-12 col-md-12 col-lg-6 col-12 row orders-product-title">
                    <Link
                      to={{
                        pathname: "/product/" + game.name.split(" ").join("-").toLowerCase(),
                        state: {
                          productID: game.id,

                        }
                      }}
                    >
                      <img src={images(`./${game.image}`)} className="img-responsive orders-product-image" />

                    </Link>
                    <div>
                      <p>{game.name}</p>
                      <p> Platforms: {"Xbox"}</p>
                    </div>
                  </div>




                  <div className="col-sm-6 col-md-6 col-lg-2 col-6">
                    <h6> Price</h6>
                    <p className="">{game.price}</p>
                  </div>

                  <div className="col-sm-6 col-md-6 col-lg-2 col-6">
                    <h6> Quantity</h6>
                    <p className="">{game.keys.length}</p>
                  </div>

                  <div className="col-sm-6 col-md-6 col-lg-2 col-6">
                    <h6> State</h6>
                    <p className="text-success">Delivered</p>
                  </div>

                  <div className="col-sm-12 col-md-12 center-align">
                    <div>
                      <div className="d-none">
                        {game.keys.map((key, index) =>
                          <p key={key}> Key {index + 1}: {key} </p>
                        )}

                      </div>

                      {game.keys.length > 1 ? <button className="btn btn-primary" onClick={revealKey}> Click here to reveal keys</button>
                        : <button className="btn btn-primary" onClick={revealKey}> Click here to reveal key</button>}


                    </div>
                  </div>


                </div>

              )}
            </div>



          </div>
        )}



      </div>
    )

  }


  useEffect(() => {
    const token = 'Bearer ' + user.token;
    axios({
      method: 'get',
      url: 'http://www.imviczz.com:8080/api/user/orders',
      headers: {
        Authorization: token
      }
    })
      .then(res => {

        let data = (res.data);
        if (data !== false) {
          setOrders(data[0])
        }
      });
  }, [])




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

              {orders && orders.orders ? showOrders() : <p>You don't have any order yet!</p>}

            </div>
          </div>
        </div>
      </div>
    </div>




  )


}



export default User;
