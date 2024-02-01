import './Home.css';
import './UserRegistration.css';

import Head from "../../layouts/common/Head";
import Heder from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/common/user.service';

import { Hourglass } from "react-loader-spinner";

function UserRegistration() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [userId, setUserId] = useState(null);

  const [loader, setLoader] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [enableVerify, setEnableVerify] = useState(false);

  const navigate = useNavigate();


  const validateEmailAddress = (emailAddress) => {
    var atSymbol = emailAddress.indexOf("@");
    var dotSymbol = emailAddress.lastIndexOf(".");
    var spaceSymbol = emailAddress.indexOf(" ");

    if ((atSymbol != -1) &&
      (atSymbol != 0) &&
      (dotSymbol != -1) &&
      (dotSymbol != 0) &&
      (dotSymbol > atSymbol + 1) &&
      (emailAddress.length > dotSymbol + 1) &&
      (spaceSymbol == -1)) {
      return true;
    } else {
      return false;
    }
  }

  const validatePhoneNumber = (inputtxt) => {
    return true;
    var phoneno = /^\d{10}$/;
    if (inputtxt.value.match(phoneno)) {
      return true;
    }
    else {
      alert("message");
      return false;
    }
  }

  const validate = (name, value, label) => {
    if (value === '') {
      setErrors({ ...errors, [name]: label + " is required" })
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  }

  const add = () => {
    setLoader(true);
    setErrors({ registerError: '' });

    let error = false;
    const rerrors = {};

    if (firstName.length == 0) {
      rerrors['firstName'] = 'First Name is required';
      error = true;
    }

    if (lastName.length == 0) {
      rerrors['lastName'] = 'Last Name is required';
      error = true;
    }

    if (email.length == 0) {
      rerrors['email'] = 'Email is required';
      error = true;
    } else if (!validateEmailAddress(email)) {
      rerrors['email'] = 'Please enter valid Email';
      error = true;
    }

    if (password.length == 0) {
      rerrors['password'] = 'Password is required';
      error = true;
    }


    if (!error) {

      userService.create({ firstName, lastName, email, password, role: userRole })
        .then(response => {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          setIsRegister(true);
          const token = response.data.token;

          // Store the token securely (e.g., in localStorage or HTTP-only cookies)
          localStorage.setItem('token', token);
          setTimeout(() => {
            // Inside the handleLogin function
            navigate('/profile'); // Redirect to the dashboard after login
          }, 1500);

        })
        .catch(e => {
          console.log(e);

          if (e && e.code) {
            if (e.response && e.response.data) {
              if (e.response.data.email) {
                setErrors({ registerError: e.response.data.email });
              }
            } else {
              setErrors({ registerError: e.message });
            }
          }
          setTimeout(() => { setLoader(false); window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)
        });

    } else {
      setLoader(false);
      window.scrollTo({ top: 10, behavior: "smooth" });
      setErrors(rerrors);
    }

  }

  return (
    <>
      <Head />
      <Heder />
      <main id="main" style={{ 'paddingTop': '150px' }}>

        <section class="testimonial py-5" id="testimonial">
          <div class="container">
            <div class="row" style={{ "textAlign": "right", 'height': '50px' }}>
              <a href="/company" style={{ 'textDecoration': 'none' }}><storng>Are you an Employer?</storng></a>
            </div>
            <div class="row ">
              <div class="col-md-4 py-5 text-white text-center " style={{backgroundColor:'#0ea2bd'}}>
                <div class=" ">
                  <div class="card-body">
                    <img src="http://www.ansonika.com/mavia/img/registration_bg.svg" style={{ "width": "30%" }} />
                    <h2 class="py-3">Registration</h2>
                    <p>Unlock holiday job opportunities! <br />Register now for better career prospects during your holiday trip. 🌟</p>
                  </div>
                </div>
              </div>
              <div class="col-md-7 py-5 border" style={{ background: "#fff" }}>
                {errors && errors.registerError && <div class="alert alert-danger" role="alert">
                  {errors && errors.registerError}</div>}
                {isRegister && <div class="alert alert-success" role="alert">
                  User Registered successfully!
                </div>}
                {!isRegister && <div><h4 class="pb-4">Please fill with your details</h4>
                  <form>
                    <div class="form-row">
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label>First Name*</label>
                          <input id="firstName" name="First Name" value={firstName} onChange={(event) => { validate('firstName', event.target.value, 'First Name'); setFirstName(event.target.value) }} required placeholder="First Name" class="form-control" type="text" />
                          <span class="error col-12">{errors && errors.firstName}</span>
                        </div>
                        <div class="form-group col-md-6">
                          <label>Last Name*</label>
                          <input id="lastName" name="Last Name" value={lastName} onChange={(event) => { validate('lastName', event.target.value, 'Last Name'); setLastName(event.target.value) }} required placeholder="Last Name" class="form-control" type="text" />
                          <span class="error col-12">{errors && errors.lastName}</span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label>Email*</label>
                          <input type="email" name="Email" value={email} onChange={(event) => { validate('email', event.target.value, 'Email'); setEmail(event.target.value) }} required class="form-control" id="email" placeholder="Email" />
                          <span class="error col-12">{errors && errors.email}</span>
                        </div>
                        <div class="form-group col-md-6">
                          <label>Password*</label>
                          <input id="password" type="password" name="password" value={password} onChange={(event) => { validate('password', event.target.value, 'Password'); setPassword(event.target.value) }} required placeholder="Password" class="form-control" />
                          <span class="error col-12">{errors && errors.password}</span>
                        </div>
                      </div>
                    </div>
                    <div class="form-row ml-5">
                      <div class="form-group">
                        <div class="form-group">
                          <div class="form-check ml-2">
                            <label class="form-check-label" for="invalidCheck2">
                              <small><span>By registering you agree to <a href="/privacy" target="_blank" >Privacy Policy</a></span></small>
                            </label>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div class="form-row">
                      <button type="button" onClick={() => add()} class="btn btn-danger">Register</button>
                    </div>
                  </form>
                </div>}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />      
      <Hourglass
        visible={loader}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{position:'absolute',top:'80%',left:'50%'}}
        wrapperClass=""
        colors={['#0ea2bd', '#72a1ed']}
      />
    </>
  );
}

export default UserRegistration;
