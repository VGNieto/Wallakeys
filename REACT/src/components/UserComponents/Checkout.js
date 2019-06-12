import React, { useContext, useEffect, useState } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext, CartReducer } from '../CartDispatch';
import axios from 'axios';
const images = require.context('../../img', true);


const Checkout = (props) => {

    const [user, setUser] = useContext(UserContext);
    const [cart, setCart] = useContext(CartContext)
    const [creditCards, setCreditCards] = useState({
        cards: [],
        _id: {},

    });
    const [saveCreditCard, setSaveCreditCard] = useState(false);

    const [disabledNew, setDisabledNew] = useState(false);

    const [fullName, setFullName] = useState();
    const [number, setNumber] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [cvv, setCVV] = useState();

    const [card,setCard] = useState("undefined");
    const [result, setResult] = useState();
    const [spinnerTimeOut, setSpinnerTimeOut] = useState();
    const [savedTimeOut, setSavedTimeOut] = useState();


    const handleCardChange = (e) =>{
        setCard(e.target.value);
    }
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    }
    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    }
    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    }
    const handleYearChange = (e) => {
        setYear(e.target.value);
    }
    const handleCVVChange = (e) => {
        setCVV(e.target.value);
    }

    const handleNewMethod = (e) => {
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

    useEffect(() => {
        const token = 'Bearer ' + user.token;

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/user/account/cards',
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


    const addCard = (e) => {
        setDisabledNew(true);
        const token = 'Bearer ' + user.token;

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/addcard',
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
    const createOrder = () => {
        const token = 'Bearer ' + user.token;
        const games = (cart.items.map((element) => {
            return (element.id + "+" + element.quantity)
        }));
        
        if (saveCreditCard ) {
            addCard();
        }

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/order/new',
            headers: {
                Authorization: token,

            },
            params: {
                games: games.toString(),
                total: totalPrice()

            }
        }).then(res => {

            


        });
    }

    console.log(card);
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
                                
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Credit Card</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01"   onChange={handleCardChange} >
                            <option value="undefined" selected>Choose...</option>
                            {creditCards.cards.length > 0 ?
                                creditCards.cards.map((card) =>
                            <option value={card.id.$oid} >{"Card terminated in " + card.number.substr(card.number.length - 4, card.number.length)}</option>

                                )
                                : null}
                        </select>
                    </div>

                    <div class="tab-content payment-tabs">

                        <div class="tab-pane fade show active" id="nav-tab-card">
                            <div className="col-md-12 offset-md-12 center-align" style={{ alignItems: "center" }}>
                                <button className="btn btn-secondary" onClick={handleNewMethod} style={{marginRight:"20px"}}><i class="fa fa-credit-card"></i> Use new card</button>
                                <button className="btn btn-primary" onClick={createOrder}><i class="fa fa-cash-register"></i> Confirm order</button>

                            </div>

                            <form role="form " className="account-payment" id="new-payment-method">
                                <div class="form-group">
                                    <label for="username">Full name</label>
                                    <input type="text" class="form-control" onChange={handleFullNameChange} value={fullName} placeholder="" required="" />
                                </div>

                                <div class="form-group">
                                    <label for="cardNumber">Card number</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" onChange={handleNumberChange} name="cardNumber" value={number} placeholder="" />
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
                                                <input type="number" class="form-control" onChange={handleMonthChange} placeholder="MM" name="" value={month} />
                                                <input type="number" class="form-control" onChange={handleYearChange} placeholder="YY" name="" value={year} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV </label>
                                            <input type="number" class="form-control" onChange={handleCVVChange} value={cvv} required="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 offset-md-4 center-align" style={{ alignItems: "center" }}>
                                    <div style={{ paddingRight: "30px" }}>
                                        <input class="form-check-input" type="checkbox" onClick={() => { setSaveCreditCard(!saveCreditCard) }}
                                            value={saveCreditCard} id="defaultCheck1" />
                                        <label class="form-check-label" for="defaultCheck1">
                                            Save credit card
                                        </label>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={createOrder} disabled={disabledNew}> Confirm order</button>
                                    <div id="loading-spinner" className="d-none" style={{ padding: "10px" }}>
                                        <div className="spinner-border d-flex justify-content-center " role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="tab-pane fade" id="nav-tab-paypal">
                            <p>Paypal is easiest way to pay online</p>
                            <p>
                                <button type="button" class="btn btn-primary" onClick={createOrder}> <i class="fab fa-paypal"></i> Log in my Paypal </button>
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
