import './UserLogin.css';

import Head from "../../layouts/common/Head";
import Heder from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/common/user.service';

import { Hourglass } from "react-loader-spinner";

function UserLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' })
  
  const [loader, setLoader] = useState(false);
  
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

  const login = () => {
    setLoader(true);
    setErrors({ loginError: '' });

    let error = false;
    const rerrors = {};


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

      userService.login({ email, password })
        .then(response => {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
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
                setErrors({ loginError: e.response.data.email });
              }

              if (e.response.data.message) {
                setErrors({ loginError: e.response.data.message });
              }
            } else {
              setErrors({ loginError: e.message });
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
        <section >
            
          <div class="container-fluid h-custom">
          
            <div className="row" style={{ "textAlign": "right", 'height': '50px' }}>
              <a href="/company" style={{ 'textDecoration': 'none' }}><storng>Are you an Employer?</storng></a>
            </div>
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  class="img-fluid" alt="Sample image" />
              </div>
              <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              {errors && errors.loginError && <div class="alert alert-danger" role="alert">
                  {errors && errors.loginError}</div>}
                <form>
                  <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <h3 class="lead fw-normal mb-5 me-3">Login</h3>
                   <hr/>
                  </div>

                  <div class="form-outline mb-4">
                  
                  <label class="form-label" for="form3Example3">Email address</label>
                    <input type="email" class="form-control form-control-lg"
                      value={email} onChange={(event) => { validate('email', event.target.value, 'Email'); setEmail(event.target.value) }} required  id="email" placeholder="Email" />
                    <span class="error col-12">{errors && errors.email}</span>
                  </div>

                  <div class="form-outline mb-3">
                  
                  <label class="form-label" for="form3Example4">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(event) => { validate('password', event.target.value, 'Password'); setPassword(event.target.value) }} required placeholder="Password" class="form-control form-control-lg"
                      />
                    <span class="error col-12">{errors && errors.password}</span>
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="form-check mb-0">
                      <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label class="form-check-label" for="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" class="text-body">Forgot password?</a>
                  </div>

                  <div class="text-center text-lg-start mt-4 pt-2">
                    <button type="button" onClick={() => login()} class="btn btn-primary btn-lg"
                      style={{"paddingLeft": "2.5rem", "paddingRight": "2.5rem"}}>Login</button>
                    <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                      class="link-danger">Register</a></p>
                  </div>

                </form>
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
        wrapperStyle={{ position: 'absolute', top: '80%', left: '50%' }}
        wrapperClass=""
        colors={['#0ea2bd', '#72a1ed']}
      />
    </>
  );
}

export default UserLogin;
