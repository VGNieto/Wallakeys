/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';


const User = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [userDetails, setUserdetails] = useState({
    email: "",
    fullname: "",
    birthday: "",
    country: "",
  })
  const [password, setPassword] = useState();

  const [validName, setValidName] = useState("");
  const [result, setResult] = useState();
  const [spinnerTimeOut, setSpinnerTimeOut] = useState();
  const [savedTimeOut, setSavedTimeOut] = useState();

  console.log(validName);

  const countryHandle = () => {

    const countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica",
      "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
      "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island",
      "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
      "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia",
      "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba",
      "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
      "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France",
      "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany",
      "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
      "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia",
      "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
      "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia",
      "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau",
      "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
      "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco",
      "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles",
      "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway",
      "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal",
      "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
      "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles",
      "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
      "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan",
      "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China",
      "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia",
      "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
      "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
      "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia",
      "Zambia", "Zimbabwe"];

    const countr = countries.map((country) => {
      if (country == userDetails.country) {
        return (<option value={country} key={country} selected> {country}</option>)

      } else {
        return (<option value={country} key={country}> {country}</option>)

      }

    });

    return (
      countr
    )

  }

  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  }
  const confirmDelete = (e) => {
    if (user.token) {
      const token = 'Bearer ' + user.token;


      clearTimeout(savedTimeOut);

      axios({
        method: 'delete',
        url: 'https://api.imviczz.com/api/user/delete',
        headers: {
          Authorization: token,

        },

      }).then(res => {

        if(res.data == true){
          dispatch({ type: 'logout' });
          window.location.href="/"
        }

      });
    }
  }
  const showResult = () => {

    if (result == true) {
      return (
        <p className="" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "green" }}>Changes saved</p>
      )
    } else if (result == false) {
      return (
        <p className="" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}>Changes not saved</p>
      )
    } else {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}></p>

      )
    }

  }

  const saveChanges = () => {
    const token = 'Bearer ' + user.token;
    let spinner = document.getElementById("loading-spinner");
    let savedchanges = document.getElementById("saved-changes");
    spinner.className = "";
    savedchanges.className = "d-none";
    clearTimeout(spinnerTimeOut);
    clearTimeout(savedTimeOut);

    axios({
      method: 'post',
      url: 'https://api.imviczz.com/api/user/update',
      headers: {
        Authorization: token,

      },
      params: {
        fullname: userDetails.fullname,
        birthday: userDetails.birthday,
        country: userDetails.country
      }
    })
      .then(res => {
        setResult(res.data);
        console.log(res.data);
        setSpinnerTimeOut(setTimeout(() => {
          savedchanges.className = "";
          spinner.className = "d-none";
          setSavedTimeOut(setTimeout(() => {
            savedchanges.className = "d-none";
          }, 2000))
        }, 1000))

      });




  }

  const handleBirthdayChange = (e) => {
    setUserdetails({ ...userDetails, birthday: e.currentTarget.value })
  }

  const handleFullNameChanges = (e) => {
    setUserdetails({ ...userDetails, fullname: e.currentTarget.value });
    let reg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (e.currentTarget.value.length == 0) {
      setValidName("");
    } else {
      if (reg.test(e.currentTarget.value)) {
        setValidName("")
      } else {
        setValidName("is-invalid");
      }
    }
    console.log(reg.test(e.currentTarget.value));
  }

  const handleCountryChanges = (e) => {
    setUserdetails({ ...userDetails, country: e.currentTarget.value })
  }

  useEffect(() => {
    if (user.token) {


      const token = 'Bearer ' + user.token;
      axios({
        method: 'get',
        url: 'https://api.imviczz.com/api/user/info',
        headers: {
          Authorization: token
        }
      })
        .then(res => {

          let data = (res.data);
          if (data !== false) {
            setUserdetails({ ...userDetails, ...data[0] })
          }
        });
    }
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
            <div className="card-header">Account details</div>
            <div className="card-body">
              <form action="" method="">

                <div className="form-group row">
                  <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">Email</label>
                  <div className="col-md-6">
                    <input type="text" defaultValue={userDetails.email} id="email_address" className="form-control" name="email-address" disabled />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">Full Name</label>
                  <div className="col-md-6">
                    <input type="text" id="full_name" className={"form-control " + validName} name="full_name" onChange={handleFullNameChanges} defaultValue={userDetails.fullname} required autoFocus />
                    {validName != "" ? <p className="horizontal-align text-danger"> Name must contain only letters</p> : null}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="country" className="col-md-4 col-form-label text-md-right">Country</label>
                  <div className="col-md-6">
                    <select className="custom-select" id="country" name="country_select" onChange={handleCountryChanges} required >
                      <option selected disabled> Select one...</option>
                      {countryHandle()}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="birth_date" className="col-md-4 col-form-label text-md-right">Birthday</label>
                  <div className="col-md-6">
                    <input type="date" id="birth_date" className="form-control" onChange={handleBirthdayChange}
                      defaultValue={userDetails.birthday} name="birth_date" required />
                  </div>
                </div>


                <div className="col-md-6 offset-md-4 center-align" style={{ alignItems: "center" }}>
                  {validName == "" ? <button type="button" className="btn btn-primary" onClick={saveChanges}> Save Changes </button>

                    :
                    <div>
                      <button type="button" className="btn btn-primary horizontal-align" disabled > Save Changes </button>
                    </div>
                  }
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

        <div id="pwdModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="center-align">Are you sure? Introduce your password</h4>
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
                            <button className="btn btn-lg btn-primary btn-block" data-dismiss="modal" aria-hidden="true" onClick={confirmDelete}>Delete account</button>
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
      <a style={{ float: "right" }} className="text-danger" href="#" data-target="#pwdModal" data-toggle="modal">Delete account</a>

    </div>








  )


}



export default User;
