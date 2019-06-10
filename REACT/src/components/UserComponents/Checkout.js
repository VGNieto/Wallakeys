import React, { useContext, useEffect } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
const images = require.context('../../img', true);


const Checkout = (props) => {

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
                    <div className="card-header"> Complete Checkout</div>
                    <div className="card-body"></div>
                        <div className="col-sm-12 row checkout-container">
                            
                            <div className="col-sm-12 col-md-6">
                                <h4> Review your order</h4>
                                <h6> Products</h6>
                                <ul className="checkout-item-list">
                                {cart.items.map((item) => 
                                    <li> {item.name} <div className="checkout-number-items">x{item.quantity} <strong> {item.subtotal}$</strong> </div></li>
                                )}
                                </ul>
                            </div>

                            <div className="col-md-6 col-sm-12 checkout-total-price">
                               <div> 
                                    <h4> Order Total</h4>
                                    <h6> {totalPrice()}$ </h6>
                               </div>
                            </div>
                        </div>

                        <ul class="nav bg-light nav-pills rounded nav-fill mb-3 payment-methods" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="pill" href="#nav-tab-card">
                                    <i class="fa fa-credit-card"></i> Credit Card</a></li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="pill" href="#nav-tab-paypal">
                                    <i class="fab fa-paypal"></i>  Paypal</a></li>

                        </ul>

                       

                        <div class="tab-content payment-tabs">
                            <div class="tab-pane fade show active" id="nav-tab-card">
                                <form role="form">
                                    <div class="form-group">
                                        <label for="username">Full name (on the card)</label>
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
                                    <Link to="/account/cart/checkout/order-details"><button class="subscribe btn btn-primary btn-block" type="button"> Confirm  </button></Link>
                                </form>
                            </div>
                            <div class="tab-pane fade" id="nav-tab-paypal">
                                <p>Paypal is easiest way to pay online</p>
                                <p>
                                    <button type="button" class="btn btn-primary"> <i class="fab fa-paypal"></i> Log in my Paypal </button>
                                </p>
                                
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



export default Checkout;
