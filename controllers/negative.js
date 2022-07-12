const express = require("express");
const router = express.Router();

const Negative = require("../models/Negative");
const User = require("../models/User");

router.get("/", (req, res) => {
  User.findById(req.session.userId)
    .populate("negatives")
    .then((user) => {
      res.json(user.negatives);
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  Negative.create({
    todayOne: req.body.todayOne,
    todayTwo: req.body.todayTwo,
    todayThree: req.body.todayThree,
    generalOne: req.body.generalOne,
    generalTwo: req.body.generalTwo,
    generalThree: req.body.generalThree,
    day: new Date().getTime(),
    user: req.session.userId,
  }).then((newEntry) => {
    res.json(newEntry);
  });
});

router.put("/:entry", (req, res) => {
  Negative.findOneAndUpdate(
    { _id: req.params.entry },
    {
      todayOne: req.body.todayOne,
      todayTwo: req.body.todayTwo,
      todayThree: req.body.todayThree,
      generalOne: req.body.generalOne,
      generalTwo: req.body.generalTwo,
      generalThree: req.body.generalThree,
    }
  ).then((updatedEntry) => {
    res.json(updatedEntry);
  });
});

router.delete("/:entry", (req, res) => {
  Negative.findOneAndDelete({ _id: req.params.entry }).then((entryToDelete) => {
    res.json(entryToDelete);
  });
});

module.exports = router;
