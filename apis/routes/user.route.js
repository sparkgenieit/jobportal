const express = require("express");
const mailer = require('nodemailer');
const userExpressRoute = express.Router();
let uuidv4 = require('uuid/v4'),
  multer = require('multer'),
  router = express.Router();

// const TWILIO_PHONE_NUMBER = '+17698889434';
// const TWILIO_ACCOUNT_SID = 'AC0ebe3760ab0fa3443eaf9ffcdf5ef308';
// const TWILIO_AUTH_TOKEN = 'e503ba86046a4cd2946c07fbe698bc73';
// const client = require('twilio')(
//   TWILIO_ACCOUNT_SID,
//   TWILIO_AUTH_TOKEN
// );
const fs = require('fs');
const path = require('path');

const DIR = './public/users/';

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = uuidv4() + '-' + file.originalname.toLowerCase().split(' ').join('-')

    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
const cors = require("cors");




let UserSchema = require("../model/user.model");

// CORS OPTIONS
var whitelist = ["http://localhost:8100", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};


// Get users
userExpressRoute
  .route("/users", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    await UserSchema.find()
      .then((result) => {
        res.json({
          data: result,
          message: "Data successfully fetched!",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });



// Create user
// Create user
userExpressRoute.post("/create-user",  (req, res, next) => {

  req.body.password = bcrypt.hashSync(req.body.password, 8),


  UserSchema.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    }
    else {
      UserSchema.create(req.body)
        .then((result) => {
          res.json({
            data: result,
            message: "Data successfully added.",
            status: 200,
          });

        })
        .catch((err) => {
          console.log(req.body);
          return next(err);
        });


    }
  });
});


userExpressRoute.post("/login", (req, res) => {
  console.log('req', req.body);

  const check = {}
  if (req.body.email) {
    check.email = req.body.email;
  } else if (req.body.phone) {
    check.phone = req.body.phone;
  }

  UserSchema.findOne(check).then((user) => {
    console.log('user', user);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
/*
    if (user && !user.active) {
      return res.status(404).send({ message: "Your account is not verified." });
    }
    */

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // const token = jwt.sign({ id: user._id },
    //   config.secret,
    //   {
    //     algorithm: 'HS256',
    //     allowInsecureKeySizes: true,
    //     expiresIn: 86400, // 24 hours
    //   });
    let token = user._id;
    // var authorities = [];

    // for (let i = 0; i < user.roles.length; i++) {
    //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    // }

    //req.session.token = token;

    res.status(200).send({
      id: user._id,
      user: user,
      email: user.email,
      token: token
    });
  });
});



userExpressRoute.post("/forgot-password", async (req, res) => {
  
});

// Get single user
userExpressRoute.route("/user/:id").get(async (req, res, next) => {
  
});

// Update user
userExpressRoute.route("/update-user/:id").put(async (req, res) => {

  
});


// Delete student
userExpressRoute.route("/remove-user/:id").delete(async (req, res) => {
});

userExpressRoute.route("/subscribe").post(async (req, res) => {

});
module.exports = userExpressRoute;