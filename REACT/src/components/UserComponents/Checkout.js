
/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext, CartReducer } from '../CartDispatch';
import { OrderContext } from '../OrderDispatch';

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
    const [message, setMessage] = useState("no-order");
    //Payment method
    const [isPaypal, setIsPaypal] = useState(false);
    //Show credit cards
    const [showCreditCards, setShowCreditCards] = useState(true);
    //Check saveCreditCard
    const [saveCreditCard, setSaveCreditCard] = useState(false);
    //New card
    const [disabledNew, setDisabledNew] = useState(false);
    const [fullName, setFullName] = useState("");
    const [number, setNumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCVV] = useState("");
    //Selected card
    const [card, setCard] = useState("undefined");
    //Checkout result
    const [result, setResult] = useState();
    const [isValidName, setIsValidName] = useState("");
    const [isValidCard, setIsValidCard] = useState("");
    const [isValidMonth, setIsValidMonth] = useState("");
    const [isValidYear, setIsValidYear] = useState("");
    const [isValidCVV, setIsValidCVV] = useState("");


    const [spinnerTimeOut, setSpinnerTimeOut] = useState();
    const [savedTimeOut, setSavedTimeOut] = useState();


    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }


    const handleFullNameChange = (e) => {
        setFullName(e.currentTarget.value);

        let reg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (reg.test(e.currentTarget.value)) {
            setIsValidName("")
        } else {
            setIsValidName("is-invalid");
        }


    }
    const handleNumberChange = (e) => {
        if (e.currentTarget.value.length < 20) {
            setNumber(e.currentTarget.value);

            if (e.currentTarget.value.length != 0) {
                setNumber(e.currentTarget.value.replace(/-/g, "").match(/.{1,4}/g).join("-"));
            }
            let reg = /^\d{4}-?\d{4}-?\d{4}-?\d{4}/
            if (reg.test(e.currentTarget.value)) {
                setIsValidCard("")
            } else {
                setIsValidCard("is-invalid");
            }
        }
    }
    const handleMonthChange = (e) => {
        setMonth(e.currentTarget.value);
        if (e.currentTarget.value > 0 && e.currentTarget.value < 13) {
            setIsValidMonth("")
        } else {
            setIsValidMonth("is-invalid")
        }
    }
    const handleYearChange = (e) => {
        setYear(e.currentTarget.value);
        if (e.currentTarget.value >= new Date().getFullYear()) {
            setIsValidYear("")
        } else {
            setIsValidYear("is-invalid")
        }
    }
    const handleCVVChange = (e) => {
        setCVV(e.currentTarget.value);
        if (e.currentTarget.value.length == 3) {
            setIsValidCVV("")
        } else {
            setIsValidCVV("is-invalid")
        }
    }

    const handleNewMethod = (e) => {
        let form = document.getElementById("new-payment-method");
        let actual = document.getElementById("actualCard");
        actual.className == "d-none" ? actual.className = "btn btn-primary" : actual.className = "d-none";
        form.className == "account-payment-active" ? form.className = "account-payment" : form.className = "account-payment-active"
    }

    const handleOpenDetails = (e) => {
        const dataButton = e.currentTarget.getAttribute("data-button");
        let detailToOpen = document.getElementById(dataButton);

        detailToOpen.className == "order-details-active" ? detailToOpen.className = "order-details" : detailToOpen.className = "order-details-active"
    }

    const validateAll = () => {
        if (isValidCVV == "" && isValidCard == "" && isValidMonth == "" && isValidYear == "" && isValidName == "" &&
            cvv.length > 0 && number.length > 0 && month.length > 0 && year.length > 0 && fullName.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const handlePaypalMethod = (e) => {
        setIsPaypal(!isPaypal);
    }
    const handleCardChange = (e) => {
        setCard(e.currentTarget.value);
    }



    const totalPrice = () => {
        let totalPrice = 0;
        cart.items.forEach(element => {
            totalPrice += parseFloat(element.subtotal);
        });
        return (parseFloat(totalPrice).toFixed(2));
    }
    
    const show_message=()=>{

        return (
            message=="order" ? <div id="loading-spinner" className="" style={{ padding: "10px" }}>
            <div className="spinner-border d-flex justify-content-center " role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </div> :

            <p> First you have to place an order</p>
        )


    }

    //Get all user cards
    useEffect(() => {
        if (user.token) {
            const token = 'Bearer ' + user.token;
            if (user.token) {
                axios({
                    method: 'get',
                    url: 'https://api.imviczz.com/api/user/account/cards',
                    headers: {
                        Authorization: token,
                    }
                })
                    .then(res => {

                        let data = (res.data);
                        if (data.length > 0) {
                            console.log(data);
                            setCreditCards(data[0]);
                        }
                    });
            }
        }
    }, [])

    //Add new card
    const addCard = (e) => {
        setDisabledNew(true);
        const token = 'Bearer ' + user.token;

        axios({
            method: 'post',
            url: 'https://api.imviczz.com/api/user/addcard',
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
            url: 'https://api.imviczz.com/api/order/new',
            headers: {
                Authorization: token,
            },
            params: {
                games: games.toString(),
                total: totalPrice()

            }
        }).then(res => {


            if (res) {

                localStorage.removeItem("cart");
                games.forEach((game) => {
                    removeFromWishlist(game.substr(0, game.indexOf("+")));
                })
                setMessage("order");
                setCart({ type: "removeCart", text: null })
                setOrder({ type: "createOrder", text: res.data })

                setTimeout(() => {
                    window.location.href = "/account/cart/checkout/order-details"

                }, 1000)

            }

        });
    }

    const formatCard = (num) => {
        if (num.length != 0) {
            setNumber(num.replace(/-/g, "").match(/.{1,4}/g).join("-"));
        }

    }
    const removeFromWishlist = (game) => {
        console.log(game);
        if (user.token) {
            const token = 'Bearer ' + user.token;
            axios({
                method: 'post',
                url: 'https://api.imviczz.com/api/user/wishlist/remove',
                headers: {
                    Authorization: token,
                },
                params: {
                    id: game,
                }
            })
                .then(res => {

                    let data = (res.data);
                    if (data !== false) {


                    }
                });
        }

    }

    const confirmOrderButton = () => {
        if (!disabledNew && card != "undefined") {
            return (<button className="btn btn-primary" onClick={createOrder} id="actualCard"><i className="fa fa-cash-register"></i> Confirm order</button>)
        } else{
            return (<button className="btn btn-primary" disabled id="actualCard"><i className="fa fa-cash-register"></i> Confirm order</button>)

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
                            <a className="nav-link active" data-toggle="pill" onClick={handlePaypalMethod} href="#nav-tab-card">
                                <i className="fa fa-credit-card"></i> Credit Card</a></li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" onClick={handlePaypalMethod} href="#nav-tab-paypal">
                                <i className="fab fa-paypal"></i>  Paypal</a></li>

                    </ul>
                    {showCreditCards && !isPaypal ? <div className="input-group mb-3">
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

                            <form role="form " className="account-payment" id="new-payment-method">
                                <div className="form-group">
                                    <label htmlFor="username">Full name</label>
                                    <input type="text" className={"form-control " + isValidName} onChange={handleFullNameChange} value={fullName} placeholder="" required="" />
                                    {isValidName != "" ? <p className="text-danger">Name must contain only letters</p> : null}

                                </div>

                                <div className="form-group">
                                    <label htmlFor="cardNumber">Card number</label>
                                    <div className="input-group">
                                        <input type="text" className={"form-control " + isValidCard} onChange={handleNumberChange} name="cardNumber" value={number} placeholder="" />
                                        <div className="input-group-append">
                                            <span className="input-group-text text-muted">
                                                <i className="fab fa-cc-visa"></i>   <i className="fab fa-cc-amex"></i>
                                                <i className="fab fa-cc-mastercard"></i>
                                            </span>
                                        </div>

                                    </div>
                                    {isValidCard != "" ? <p className="text-danger">Card number is invalid.</p> : null}

                                </div>

                                <div className="row">

                                    <div className="col-sm-8 row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label><span className="hidden-xs">Expiration</span> </label>
                                                <div className="input-group">
                                                    <input type="number" className={"form-control " + isValidMonth} onChange={handleMonthChange} placeholder="MM" name="" value={month} />
                                                    {isValidMonth != "" ? <p className="text-danger">Month is invalid.</p> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label><span className="hidden-xs">Expiration</span> </label>
                                                <div className="input-group">
                                                    <input type="number" className={"form-control " + isValidYear} onChange={handleYearChange} placeholder="YY" name="" value={year} />
                                                    {isValidYear != "" ? <p className="text-danger">Year is invalid.</p> : null}
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV </label>
                                            <input type="number" className={"form-control " + isValidCVV} onChange={handleCVVChange} value={cvv} required="" />
                                        </div>
                                        {isValidCVV != "" ? <p className="text-danger">CVV must be 3 numbers.</p> : null}

                                    </div>
                                </div>
                                {console.log(validateAll())}
                                <div className="col-md-12" style={{ display: "flex", flexDirection: "column" }} >
                                    {validateAll() && !disabledNew ?
                                        <div>
                                            <div className="checkout-confirm-order">
                                                <input className="form-check-input" type="checkbox" onClick={() => { setSaveCreditCard(!saveCreditCard) }}
                                                    value={saveCreditCard} id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    Save credit card
                                                </label>
                                                <button type="button" className="btn btn-primary" onClick={createOrder}> Confirm order </button>

                                            </div>
                                        </div>
                                        :
                                        <div>
                                        <div className="checkout-confirm-order">
                                            <input className="form-check-input" type="checkbox" disabled 
                                                value={saveCreditCard} id="defaultCheck1" />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Save credit card
                                            </label>
                                            <button type="button" className="btn btn-primary" disabled > Confirm order </button>

                                        </div>
                                        </div>
                                    }


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

        cart && cart.items.length > 0 ? showProducts() : <div className="col-md-12" style={{ textAlign: "center", marginTop: "50px" }}>{show_message} </div>
    );

}



export default Checkout;
