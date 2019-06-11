import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';


const Payment = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [cards, setCards] = useState();

  const [fullName, setFullName] = useState();
  const [number, setNumber] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [cvv, setCVV] = useState();

  const [result, setResult] = useState();
  const [spinnerTimeOut, setSpinnerTimeOut] = useState();
  const [savedTimeOut, setSavedTimeOut] = useState();

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

  const handleOpenDetails = (e) => {
    const dataButton = e.target.getAttribute("data-button");
    let detailToOpen = document.getElementById(dataButton);
    console.log(detailToOpen);

    detailToOpen.className == "order-details-active" ? detailToOpen.className = "order-details" : detailToOpen.className = "order-details-active"
  }

  const showResult = () => {

    if (result == true) {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "green" }}>New card added</p>
      )
    } else if (result == false) {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}>Card not added</p>
      )
    } else {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}></p>

      )
    }

  }

  const showCards = () => {
    return (
      cards.map((card) => {
        return (
          <div>
            <div class="form-group">
              <button class="form-control  card-details-button" data-button={card.id.$oid} onClick={handleOpenDetails} >
                <p data-button="card-1"> Card terminated in  {card.number.substr(card.number.length-4,card.number.length)} </p>
                <i className="fa fa-chevron-down " data-button={card.id.$oid} disabled></i>
              </button>
            </div>

            <div className="order-details" id={card.id.$oid}>

              <div class="form-group">
                <label for="username">Full name</label>
                <span class="form-control" defaultValue=""> {card.fullname} </span>
              </div>


              <div class="row">
                <div class="col-sm-8">
                  <div class="form-group">
                    <label><span class="hidden-xs">Expiration</span> </label>
                    <div class="input-group">
                      <span class="form-control" defaultValue="" name="month"> {card.month}</span>
                      <span class="form-control" defaultValue="" name="year">{card.year} </span>

                    </div>
                  </div>
                </div>

                <div class="col-sm-4 vertical-align-delete-card">
                  <button className="btn btn-danger" onClick={deleteCard} data-button={card.id.$oid}><i class="fa fa-exclamation-circle"></i> Delete Card</button>
                </div>
              </div>

            </div>
          </div>
        )
      })
    )
  }

  const deleteCard = (e) => {
    const token = 'Bearer ' + user.token;
    let spinner = document.getElementById("loading-spinner");
    let savedchanges = document.getElementById("saved-changes");
    spinner.className = "";
    savedchanges.className = "d-none";
    const dataButton = e.target.getAttribute("data-button");

    clearTimeout(spinnerTimeOut);
    clearTimeout(savedTimeOut);

    axios({
      method: 'delete',
      url: 'http://localhost:8080/api/user/deletecard',
      headers: {
        Authorization: token,

      },
      params: {
        cardID: dataButton,
      }
    }).then(res => {
      setResult(res.data);

      setSpinnerTimeOut(setTimeout(() => {
        savedchanges.className = "";
        spinner.className = "d-none";
        setSavedTimeOut(setTimeout(() => {
          savedchanges.className = "d-none";
        }, 2000))
      }, 1000))

    });

  }

  const addCard = (e) => {
    const token = 'Bearer ' + user.token;
    let spinner = document.getElementById("loading-spinner");
    let savedchanges = document.getElementById("saved-changes");
    spinner.className = "";
    savedchanges.className = "d-none";

    clearTimeout(spinnerTimeOut);
    clearTimeout(savedTimeOut);

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
      setResult(res.data);

      setSpinnerTimeOut(setTimeout(() => {
        savedchanges.className = "";
        spinner.className = "d-none";
        setSavedTimeOut(setTimeout(() => {
          savedchanges.className = "d-none";
        }, 2000))
      }, 1000))

    });

  }

  useEffect(() => {
    const token = 'Bearer ' + user.token;
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/user/info',
      headers: {
        Authorization: token
      }
    })
      .then(res => {

        let data = (res.data);
        if (data !== false) {
          setCards(data[0].cards)
        }
      });
  }, [])


  console.log(cards);

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



            { cards != undefined ? showCards():null}



              <ul class="nav bg-light nav-pills rounded nav-fill mb-3 payment-methods" role="tablist">
                <li class="nav-item dropdown">
                  <button className="btn btn-primary" onClick={handleNewMethod}><i class="fa fa-credit-card"></i> Add new payment method</button> </li>
              </ul>





              <form role="form " className="account-payment" id="new-payment-method">
                <div class="form-group">
                  <label for="username">Full name</label>
                  <input type="text" class="form-control" onChange={handleFullNameChange} name="username" placeholder="" required="" />
                </div>

                <div class="form-group">
                  <label for="cardNumber">Card number</label>
                  <div class="input-group">
                    <input type="text" class="form-control" onChange={handleNumberChange} name="cardNumber" placeholder="" />
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
                        <input type="number" class="form-control" onChange={handleMonthChange} placeholder="MM" name="" />
                        <input type="number" class="form-control" onChange={handleYearChange} placeholder="YY" name="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV </label>
                      <input type="number" class="form-control" onChange={handleCVVChange} required="" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 offset-md-4 center-align" style={{ alignItems: "center" }}>
                  <button type="button" className="btn btn-primary" onClick={addCard}>
                    Add new card
                          </button>
                  <div id="loading-spinner" className="d-none" style={{ padding: "10px" }}>
                    <div className="spinner-border d-flex justify-content-center " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                  {showResult()}
                </div>
              </form>

            </div>
          </div>
        </div>

      </div>
    </div>




  )


}



export default Payment;
