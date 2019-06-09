import React, { useContext, useEffect } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
import StarRate from '../ExtraComponents/StarRate';
const images = require.context('../../img', true);


const OrderDetails = (props) => {

    const [user, setUser] = useContext(UserContext);
    const [cart, setCart] = useContext(CartContext)
    const totalPrice = () => {
        let totalPrice = 0;
        cart.items.forEach(element => {
            totalPrice += parseFloat(element.subtotal);
        });
        return (parseFloat(totalPrice).toFixed(2));
    }


    const showProducts = () => {
        return (
            <div class="container" style={{ paddingTop: "25px" }}>
                <div className="card" >
                    <div className="card-header"> Order details</div>
                    <div className="card-body"></div>
                        <h1 style={{textAlign:"center"}}>¡Thanks for your order!</h1>
                        <h5 className="text-success" style={{textAlign:"center"}}> Your order  #34546544 has been placed succesfully. </h5>

                    <div className="col-sm-12 row order-details-container">

                        <div className="col-sm-12 col-md-6 order-column-details">

                            <div>
                            <h5> Products</h5>
                            <ul className="order-details-item-list">
                                {cart.items.map((item) =>
                                    <li> {item.name} <div className="order-details-number-items">x{item.quantity} <strong> {item.subtotal}$</strong> </div></li>
                                )}
                            </ul>
                            </div>
                            

                            <div>
                                <h4> Order Total</h4>
                                <h6> {totalPrice()}$ </h6>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 order-column-details-right">
                            <h5>Order date: 04/23/2019 10:34</h5> 
                            <div className="btn btn-primary">Order status: Delivered <i className="fa fa-check-circle"></i></div>
                            {/*<div className="btn btn-primary">Order status: In process <i className="fa fa-running"></i></div>*/}
                            <p>You can find all information about the order, in My Orders section in your Wallakeys Account dashboard.</p> 
                            <Link to="/account/orders"> <button className="btn btn-warning">Go to My Orders <i className="fa fa-directions"></i></button> </Link>
                        </div>
                        
                    </div>

                    <div className="col-md-12"><Link class="btn btn-secondary" to="/"> <i class="fa fa-angle-left"></i> Home page </Link></div>


                </div>
            </div>
        )
    }


    return (

        showProducts()
    );


}



export default OrderDetails;
