const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//models
const User = require("../models/User");

//Signup
router.post("/signup", (req, res) =>{

  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user =>{
    res.json(user);
  })
});

//Login
router.post("/login", async (req, res) =>{

  const result = await User.findOne({
    username: req.body.username
  }).select("+password");

  const isMatch = await bcrypt.compare(req.body.password, result.password);

  if (isMatch){
    res.json(result);
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }

})