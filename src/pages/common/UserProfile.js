import './Home.css';
import './UserRegistration.css';

import Head from "../../layouts/common/Head";
import Heder from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/common/user.service';

import { Hourglass } from "react-loader-spinner";

function UserProfile() {

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
              <h3>User Profile Here</h3>
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

export default UserProfile;
