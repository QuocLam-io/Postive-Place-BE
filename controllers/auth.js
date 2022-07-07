const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

/* --------------------------------- Models --------------------------------- */
const User = require("../models/User");

/* ------------------------------ Signup Route ------------------------------ */
router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((result) => {
    req.session.userId = result.id;
    res.json(result);
  });
});

/* ------------------------------- Login Route ------------------------------ */
router.post("/login", async (req, res) => {
  const result = await User.findOne({
    username: req.body.username,
  }).select("+password");

  /* --------------------------------- Bcrypt --------------------------------- */
  const isMatch = await bcrypt.compare(req.body.password, result.password);

  if (isMatch) {
    req.session.userId = result.id;
    res.json(result);
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});
/* -------------------------------------------------------------------------- */
module.exports = router;
