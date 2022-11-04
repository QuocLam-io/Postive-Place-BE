const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRouter = require("./controllers/auth");
const apiRouter = require("./controllers/api");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

let mongoURI = "";

if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.DB_URL;
} else {
  mongoURI = "mongodb://localhost/positive-place_db";
}

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

const sess = {
  
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "none",
    secure: true,
    // httpOnly: true,
  },
  store: store,
};
console.log(sess.secret, "this has been handy");

// console.log(sess.cookie.secure); Cannot make a key-pair value for a key-pair value that doesn't exist

const parser = require("body-parser");
const cors = require("cors");
//I am only writing this to redeploy
//!* ------------------------------- Middleware ------------------------------- */
app.set("trust proxy", 1);
app.use(
  cors({
    // Access-Control-Allow-Origin: "https://positive-place.netlify.app",
    credentials: true,
    origin: ["https://positive-place.netlify.app"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(session(sess)); //Creates a session

//*Middleware before routes to activate

app.use("/auth", authRouter);
app.use("/api", apiRouter);

//* ----------------------------- Error Handling ----------------------------- */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
//* -------------------------------------------------------------------------- */

app.get("/", (req, res) => {
  res.send("Hello World");
})


app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`I'm not serving anything but I'm alive`);
});
