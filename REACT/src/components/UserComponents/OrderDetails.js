/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
import { OrderContext } from '../OrderDispatch';
import axios from 'axios';
const images = require.context('../../img', true);


const OrderDetails = (props) => {

    const [user, setUser] = useContext(UserContext);
    const [orderDetails, setOrderDetails] = useState(null);
    const [order, setOrder] = useContext(OrderContext);
    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        if (user.token) {
            const token = 'Bearer ' + user.token;

            axios({
                method: 'get',
                url: 'http://localhost:8080/api/user/order/details',
                headers: {
                    Authorization: token,

                },
                params: {
                    orderID: order.order
                }
            }).then(res => {
                
                setOrderDetails(res.data);
            });
        }

    }, [])


    const showProducts = () => {
        return (
            <div className="container" style={{ paddingTop: "25px" }}>
                <div className="card" >
                    <div className="card-header"> Order details</div>
                    <div className="card-body"></div>
                    <h1 style={{ textAlign: "center" }}>¡Thanks for your order!</h1>
                    <h5 className="text-success" style={{ textAlign: "center" }}> Your order #{orderDetails.id} has been placed succesfully. </h5>

                    <div className="col-sm-12 row order-details-container">

                        <div className="col-sm-12 col-md-6 order-column-details">

                            <div>
                                <h5> Products</h5>
                                <ul className="order-details-item-list">
                                    {orderDetails.games.map((item) =>
                                        <li key={item.name}> {item.name} <div className="order-details-number-items">x{item.quantity} <strong> {item.price * item.quantity}$</strong> </div></li>
                                    )}
                                </ul>
                            </div>


                            <div>
                                <h4> Order Total</h4>
                                <h6> {orderDetails.total}$ </h6>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 order-column-details-right">
                            <h5>Order date: {orderDetails.date}</h5>
                            <div className="btn btn-primary">Order status: Delivered <i className="fa fa-check-circle"></i></div>
                            {/*<div className="btn btn-primary">Order status: In process <i className="fa fa-running"></i></div>*/}
                            <p>You can find all information about the order, in My Orders section in your Wallakeys Account dashboard.</p>
                            <Link to="/account/orders"> <button className="btn btn-warning">Go to My Orders <i className="fa fa-directions"></i></button> </Link>
                        </div>

                    </div>

                    <div className="col-md-12"><Link className="btn btn-secondary" to="/"> <i className="fa fa-angle-left"></i> Home page </Link></div>


                </div>
            </div>
        )
    }


    return (
        orderDetails != null ? showProducts() : <div className="col-md-12" style={{ marginTop: "50px", textAlign: "center" }}>First you have to place an order  <Link className="btn btn-secondary" to="/"> <i className="fa fa-angle-left"></i> Go back to home </Link></div>

    );


}



export default OrderDetails;
