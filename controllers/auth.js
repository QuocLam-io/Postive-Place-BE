const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

/* --------------------------------- Models --------------------------------- */
const User = require("../models/User");

/* ------------------------------ Signup Route ------------------------------ */
router.post("/signup", (req, res) => {
  if (req.body.username === "" || req.body.password === "") {
    res
      .status(400)
      .json({ message: "Just type something in" });
  } else {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then((result) => {
        req.session.userId = result.id;
        res.json(result);
      })
      .catch((error) => {
        res.status(400).end("Fine, I'll be an adult!");
      });
  }
});

router.get("/me", (req, res) => {
  if (req.session.userId) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

/* ------------------------------- Login Route ------------------------------ */
router.post("/login", async (req, res) => {
  const result = await User.findOne({
    username: req.body.username,
  }).select("+password");
  //Read the doc for "select("+password")"

  /* ------ Bcrypt ------- */
  const isMatch = await bcrypt.compare(req.body.password, result.password);

  if (isMatch) {
    req.session.userId = result.id;
    
    res.json(result);
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

/* ------------------------------ Logout Route ------------------------------ */

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Goodbye Jillian" });
});

/* -------------------------------------------------------------------------- */
module.exports = router;
