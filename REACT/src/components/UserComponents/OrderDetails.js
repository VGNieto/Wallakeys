import React, { useContext, useEffect } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
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

                    <div className="col-sm-12 row order-details-container">

                        <div className="col-sm-12 col-md-6 order-column-details">
                            <h5> Products</h5>
                            <ul className="order-details-item-list">
                                {cart.items.map((item) =>
                                    <li> {item.name} <div className="order-details-number-items">x{item.quantity} <strong> {item.subtotal}$</strong> </div></li>
                                )}
                            </ul>

                            <div>
                                <h4> Order Total</h4>
                                <h6> {totalPrice()}$ </h6>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 order-column-details">
                            <h5 className="text-success"> Your order  34546544 has been placed succesfully. </h5>
                            
                        </div>

                        
                    </div>

                    <div className="col-md-12"><Link class="btn btn-warning" to="/account/cart"> <i class="fa fa-angle-left"></i> Back to cart </Link></div>


                </div>
            </div>
        )
    }


    return (

        showProducts()
    );


}



export default OrderDetails;
