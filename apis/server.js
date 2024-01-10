const express = require("express");
const https = require("http");      
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const passport = require('passport');
const mailer = require('nodemailer');
const fs = require("fs");


// Connecting MongoDB
async function mongoDbConnection() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/jobportal",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    6000
  );
}
mongoDbConnection().then(() => {
  console.log("MongoDB successfully connected.");
}),
  (error) => {
    console.log("Could not connected to database : " + err);
  };

const userRoute = require("./routes/user.route");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json()
);

// CORS
app.use(cors());
app.use("/", userRoute);

app.use(express.static(__dirname +'/public'));
// PORT
const port = process.env.PORT || 8080;
console.log(port);
// app.listen(port, () => {
//   console.log("PORT Connected on: " + port);
// });
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const options = {
  // key: fs.readFileSync("certs/server.key"),                  //Change Private Key Path here
  // cert: fs.readFileSync("certs/certificate.crt"),            //Change Main Certificate Path here
  // ca: fs.readFileSync('certs/intermediate.crt'),             //Change Intermediate Certificate Path here
  };
  
  https.createServer(options, app)
  .listen(8080, function (req, res) {                        //Change Port Number here (if required, 443 is the standard port for https)
  console.log("Server started at port 8080");                //and here 
  });