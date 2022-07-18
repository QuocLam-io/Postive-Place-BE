const express = require("express");
const app = express();
// const session = require("express-session");
const session = require("cookie-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// app.set('trust proxy,', 1);
const authRouter = require("./controllers/auth");
const apiRouter = require("./controllers/api");

const sess = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

if (process.env.ENVIRONMENT === "development") {
  sess.cookie.secure = false;
}

if (process.env.ENVIRONMENT === "production") {
  sess.cookie.secure = true;
}

// console.log(sess.cookie.secure); Cannot make a key-pair value for a key-pair value that doesn't exist

const parser = require("body-parser");
const cors = require("cors");

//!* ------------------------------- Middleware ------------------------------- */
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());
app.use(cookieParser());
app.use(session(sess)); //Creates a session
//*Middleware before routes to activate
app.use("/auth", authRouter);
app.use("/api", apiRouter);
//* -------------------------------------------------------------------------- */

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`I'm not serving anything but I'm alive`);
});

// app.listen(3001, () => console.log("I'm not serving anything but I'm alive"));
