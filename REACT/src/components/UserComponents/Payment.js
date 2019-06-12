/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';


const Payment = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [cards, setCards] = useState();
  const [card, setCard] = useState();

  const[disabledNew,setDisabledNew] = useState(false);
  const [password, setPassword] = useState();

  const [fullName, setFullName] = useState();
  const [number, setNumber] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [cvv, setCVV] = useState();


  const [result, setResult] = useState();
  const [spinnerTimeOut, setSpinnerTimeOut] = useState();
  const [savedTimeOut, setSavedTimeOut] = useState();


  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
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
    let form = document.getElementById("new-payment-method");
    form.className == "account-payment-active" ? form.className = "account-payment" : form.className = "account-payment-active"
  }

  const handleOpenDetails = (e) => {
    const dataButton = e.currentTarget.getAttribute("data-button");
    let detailToOpen = document.getElementById(dataButton);

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
    } else if (result == "deleted") {
      return (
        <p className="" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "green" }}>Card deleted</p>
      )
    } else if (result == "notdeleted") {
      return (
        <p className="" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}>Incorrect password</p>
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
          <div key={card.id.$oid}>
            <div className="form-group">
              <button className="form-control  card-details-button" data-button={card.id.$oid} onClick={handleOpenDetails} >
                <p data-button="card-1"> Card terminated in  {card.number.substr(card.number.length - 4, card.number.length)} </p>
                <i className="fa fa-chevron-down " data-button={card.id.$oid} disabled></i>
              </button>
            </div>

            <div className="order-details" id={card.id.$oid}>

              <div className="form-group">
                <label htmlFor="username">Full name</label>
                <span className="form-control" defaultValue=""> {card.fullname} </span>
              </div>


              <div className="row">
                <div className="col-sm-8">
                  <div className="form-group">
                    <label><span className="hidden-xs">Expiration</span> </label>
                    <div className="input-group">
                      <span className="form-control" defaultValue="" name="month"> {card.month}</span>
                      <span className="form-control" defaultValue="" name="year">{card.year} </span>

                    </div>
                  </div>
                </div>

                <div className="col-sm-4 vertical-align-delete-card">
                  <a href="#" data-target="#pwdModal" data-toggle="modal" onClick={() => { setCard(card.id.$oid) }}>Delete card</a>

                </div>
              </div>

            </div>
          </div>
        )
      })
    )
  }

  const confirmDelete = (e) => {
    const token = 'Bearer ' + user.token;
    let spinner = document.getElementById("loading-spinner");
    let savedchanges = document.getElementById("saved-changes");
    savedchanges.className = "d-none";

    let details = document.getElementById(card);
    details.className = "d-none";

    clearTimeout(savedTimeOut);

    axios({
      method: 'delete',
      url: 'https://www.imviczz.com:8080/api/user/deletecard',
      headers: {
        Authorization: token,

      },
      params: {
        cardID: card,
        password: password,
      }
    }).then(res => {
      setPassword("");
      setResult(res.data);
      savedchanges.className="";
      setSavedTimeOut(setTimeout(()=>{
        setResult();
        savedchanges.className="d-none"
      },3000)
      
      )

    });

  }

  const addCard = (e) => {
    setDisabledNew(true);
    const token = 'Bearer ' + user.token;
    let spinner = document.getElementById("loading-spinner");
    let savedchanges = document.getElementById("saved-changes");
    spinner.className = "";
    savedchanges.className = "d-none";
    clearTimeout(spinnerTimeOut);
    clearTimeout(savedTimeOut);

    axios({
      method: 'post',
      url: 'https://www.imviczz.com:8080/api/user/addcard',
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


      setSpinnerTimeOut(setTimeout(() => {

        savedchanges.className = "";
        spinner.className = "d-none";
        setSavedTimeOut(setTimeout(() => {
          savedchanges.className = "d-none";
        }, 2000))
        setCVV(""); setFullName(""); setMonth(""); setYear(""); setNumber("");

        setResult();
        setResult(res.data);
        setDisabledNew(false);
        handleNewMethod();
      }, 1000))

    });

  }

  useEffect(() => {
    const token = 'Bearer ' + user.token;
    axios({
      method: 'get',
      url: 'https://www.imviczz.com:8080/api/user/info',
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
  }, [result])



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



              {cards != undefined ? showCards() : null}


              <div className="col-md-12 offset-md-12 center-align"style={{alignItems:"center"}}>
                <button className="btn btn-primary" onClick={handleNewMethod}><i className="fa fa-credit-card"></i> Add new payment method</button>
                {showResult()}
              </div>
              
              <form role="form " className="account-payment" id="new-payment-method">
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
                  <button type="button" className="btn btn-primary" onClick={addCard} disabled={disabledNew}> Add new card</button>
                  <div id="loading-spinner" className="d-none" style={{ padding: "10px" }}>
                    <div className="spinner-border d-flex justify-content-center " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </form>


              <div id="pwdModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="center-align">Introduce your password</h4>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-12">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <div className="text-center">
                              <div className="panel-body">
                                <fieldset>
                                  <div className="form-group">
                                    <input className="form-control input-lg" placeholder="Password" value={password} onChange={handlePasswordChange} name="Password" type="Password" />
                                  </div>
                                  <button className="btn btn-lg btn-primary btn-block" data-dismiss="modal" aria-hidden="true" onClick={confirmDelete}>Delete Card</button>
                                </fieldset>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="col-md-12">
                        <button className="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>




  )


}



export default Payment;
