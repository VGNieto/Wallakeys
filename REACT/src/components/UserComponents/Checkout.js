
/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link,Redirect } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext, CartReducer } from '../CartDispatch';
import {OrderContext} from '../OrderDispatch';

import axios from 'axios';
const images = require.context('../../img', true);


const Checkout = (props) => {

    const [user, setUser] = useContext(UserContext);
    const [cart, setCart] = useContext(CartContext)
    const [order, setOrder] = useContext(OrderContext);

    const [creditCards, setCreditCards] = useState({
        cards: [],
        _id: {},

    });

    //Payment method
    const [isPaypal,setIsPaypal] = useState(false);
    //Show credit cards
    const [showCreditCards,setShowCreditCards] = useState(true);
    //Check saveCreditCard
    const [saveCreditCard, setSaveCreditCard] = useState(false);
    //New card
    const [disabledNew, setDisabledNew] = useState(false);
    const [fullName, setFullName] = useState();
    const [number, setNumber] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [cvv, setCVV] = useState();
    //Selected card
    const [card, setCard] = useState("undefined");
    //Checkout result
    const [result, setResult] = useState();


    const handlePaypalMethod = (e) =>{
        setIsPaypal(!isPaypal);
    }
    const handleCardChange = (e) => {
        setCard(e.currentTarget.value);
    }
    const handleFullNameChange = (e) => {
        setFullName(e.currentTarget.value);
    }
    const handleNumberChange = (e) => {
        setNumber(e.currentTarget.value);
    }
    const handleMonthChange = (e) => {
        setMonth(e.currentTarget.value);
    }
    const handleYearChange = (e) => {
        setYear(e.currentTarget.value);
    }
    const handleCVVChange = (e) => {
        setCVV(e.currentTarget.value);
    }

    const handleNewMethod = (e) => {
        setDisabledNew(!disabledNew);
        setShowCreditCards(!showCreditCards);
        let form = document.getElementById("new-payment-method");
        form.className == "account-payment-active" ? form.className = "account-payment" : form.className = "account-payment-active"
    }
    const totalPrice = () => {
        let totalPrice = 0;
        cart.items.forEach(element => {
            totalPrice += parseFloat(element.subtotal);
        });
        return (parseFloat(totalPrice).toFixed(2));
    }

    //Get all user cards
    useEffect(() => {
        const token = 'Bearer ' + user.token;

        axios({
            method: 'get',
            url: 'http://www.imviczz.com:8080/api/user/account/cards',
            headers: {
                Authorization: token,
            }
        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {
                    setCreditCards(data[0]);
                }
            });
    }, [])

    //Add new card
    const addCard = (e) => {
        setDisabledNew(true);
        const token = 'Bearer ' + user.token;

        axios({
            method: 'post',
            url: 'http://www.imviczz.com:8080/api/user/addcard',
            headers: {
                Authorization: token,

            },
            params: {
                fullName: fullName,
                number: number,
                month: month,
                year: year,
                CVV: cvv,
            }
        }).then(res => {


            setCVV(""); setFullName(""); setMonth(""); setYear(""); setNumber("");

            setResult();
            setResult(res.data);
            setDisabledNew(false);
            handleNewMethod();


        });
    }

    //Create new order
    const createOrder = (e) => {
        const token = 'Bearer ' + user.token;
        const games = (cart.items.map((element) => {
            return (element.id + "+" + element.quantity)
        }));

        if (saveCreditCard) {
            addCard();
        }

        axios({
            method: 'post',
            url: 'http://www.imviczz.com:8080/api/order/new',
            headers: {
                Authorization: token,
            },
            params: {
                games: games.toString(),
                total: totalPrice()

            }
        }).then(res => {
            

            if(res){
                setOrder({type:"createOrder",text:res.data})
                window.location.href = "/account/cart/checkout/order-details";
            }

        });
    }
    
    const confirmOrderButton = () =>{
        if(!disabledNew){
            return (<button className="btn btn-primary" onClick={createOrder} id="actualCard"><i className="fa fa-cash-register"></i> Confirm order</button>)
        }
    }

    //Show all products
    const showProducts = () => {
        return (
            <div className="container" style={{ paddingTop: "25px" }}>
                <div className="card" >
                    <div className="card-header"> Complete Checkout</div>
                    <div className="card-body"></div>
                    <div className="col-sm-12 row checkout-container">

                        <div className="col-sm-12 col-md-6">
                            <h4> Review your order</h4>
                            <h6> Products</h6>
                            <ul className="checkout-item-list">
                                {cart.items.map((item) =>
                                    <li key={item.name}> {item.name} <div className="checkout-number-items">x{item.quantity} <strong> {item.subtotal}$</strong> </div></li>
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
                    <ul className="nav bg-light nav-pills rounded nav-fill mb-3 payment-methods" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="pill"  onClick={handlePaypalMethod} href="#nav-tab-card">
                                <i className="fa fa-credit-card"></i> Credit Card</a></li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill"  onClick={handlePaypalMethod} href="#nav-tab-paypal">
                                <i className="fab fa-paypal"></i>  Paypal</a></li>

                    </ul>
                    {showCreditCards &&  !isPaypal ? <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Credit Card</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={handleCardChange} >
                            <option value="undefined" defaultValue>Choose one of saved cards...</option>
                            {creditCards.cards && creditCards.cards.length > 0 ?
                                creditCards.cards.map((card) =>
                                    <option value={card.id.$oid} >{"Card terminated in " + card.number.substr(card.number.length - 4, card.number.length)}</option>
                                    
                                )
                                : null}
                        </select>
                    </div> : null}
                    

                    <div className="tab-content payment-tabs">

                        {/* Credit card tab */}
                        <div className="tab-pane fade show active" id="nav-tab-card">
                            <div className="col-md-12 offset-md-12 center-align checkout-confirm-orders" style={{ alignItems: "center" }}>

                                
                                <button className="btn btn-secondary" onClick={handleNewMethod} ><i className="fa fa-credit-card"></i> Use new card</button>
                                {confirmOrderButton()}

                            </div>

                            <form role="form " className="account-payment" id="new-payment-method"style={{paddingTop:"30px"}}>
                                <div className="form-group">
                                    <label htmlFor="username">Full name</label>
                                    <input type="text" className="form-control" onChange={handleFullNameChange} value={fullName} placeholder="" required="" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cardNumber">Card number</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={handleNumberChange} name="cardNumber" value={number} placeholder="" />
                                        <div className="input-group-append">
                                            <span className="input-group-text text-muted">
                                                <i className="fab fa-cc-visa"></i>   <i className="fab fa-cc-amex"></i>
                                                <i className="fab fa-cc-mastercard"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="form-group">
                                            <label><span className="hidden-xs">Expiration</span> </label>
                                            <div className="input-group">
                                                <input type="number" className="form-control" onChange={handleMonthChange} placeholder="MM" name="" value={month} />
                                                <input type="number" className="form-control" onChange={handleYearChange} placeholder="YY" name="" value={year} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV </label>
                                            <input type="number" className="form-control" onChange={handleCVVChange} value={cvv} required="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 offset-md-4 center-align" style={{ alignItems: "center" }}>
                                    <div style={{ paddingRight: "30px" }}>
                                        <input className="form-check-input" type="checkbox" onClick={() => { setSaveCreditCard(!saveCreditCard) }}
                                            value={saveCreditCard} id="defaultCheck1" />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Save credit card
                                        </label>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={createOrder} value="newCredit" > <i className="fa fa-cash-register"></i> Confirm order </button>
                                    <div id="loading-spinner" className="d-none" style={{ padding: "10px" }}>
                                        <div className="spinner-border d-flex justify-content-center " role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="tab-pane fade" id="nav-tab-paypal">
                            <p>You will be redirected to PayPal site to complete the order.</p>
                            <p>

                              <button type="button" className="btn btn-primary" onClick={createOrder}> <i className="fab fa-paypal"></i> Checkout with Paypal </button>
                            
                            </p>

                        </div>

                    </div>
                    <div className="col-md-12"><Link className="btn btn-warning" to="/account/cart"> <i className="fa fa-angle-left"></i> Back to cart </Link></div>


                </div>
            </div>
        )
    }


    return (

            cart && cart.items.length>0 ? showProducts() :<div className="col-md-12" style={{textAlign:"center",marginTop:"50px"}}>First you have to add something to your cart! <Link className="btn btn-secondary" to="/"> <i className="fa fa-angle-left"></i> Go back to home </Link></div>
        );

}



export default Checkout;
