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

          localStorage.setItem('user_id', response.data._id);
          // Store the token securely (e.g., in localStorage or HTTP-only cookies)
          localStorage.setItem('token', token);
          localStorage.setItem('fullname', response.data.first_name + " " + response.data.last_name)


          localStorage.setItem('role', response.data.role)
          setTimeout(() => {
            // Inside the handleLogin function

            navigate('/viewprofile'); // Redirect to the dashboard after login
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


      <div class="row">
        <div class="col-12">
          {errors && errors.loginError && <div class="alert alert-danger" role="alert">
            {errors && errors.loginError}</div>}
          <form>

            <div class="form-outline mb-4">

              <label class="form-label" for="form3Example3">Email address</label>
              <input type="email" class="form-control form-control-lg"
                value={email} onChange={(event) => { validate('email', event.target.value, 'Email'); setEmail(event.target.value) }} required id="email" placeholder="Email" />
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
                <button type="button" onClick={() => login()} class="btn btn-primary btn-lg"
                  style={{ "paddingLeft": "2.5rem", "paddingRight": "2.5rem" }}>Login</button>
              </div>
              <a href="#!" class="text-body">Forgot password?</a>
            </div>


          </form>
        </div>
      </div>
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
