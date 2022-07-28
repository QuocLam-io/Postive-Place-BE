const express = require("express");
const router = express.Router();
const moment = require("moment");

const Positive = require("../models/Positive");

router.get("/", (req, res) => {
  console.log(req.session.userId);
  Positive.find({ user: req.session.userId })
    .then((positiveEntries) => {
      console.log(positiveEntries);
      res.json(positiveEntries);
    })
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  Positive.findById(req.params.id)
    .then((positiveEntry) => {
      res.json(positiveEntry);
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  Positive.create({
    todayOne: req.body.todayOne,
    todayTwo: req.body.todayTwo,
    todayThree: req.body.todayThree,
    // day: new Date().getTime(),
    day: moment().format("MMMM Do YYYY"),
    user: req.session.userId,
  }).then((newEntry) => {
    console.log(newEntry);
    res.json(newEntry);
  });
});

router.put("/:entry", (req, res) => {
  Positive.findOneAndUpdate(
    { _id: req.params.entry },
    {
      todayOne: req.body.todayOne,
      todayTwo: req.body.todayTwo,
      todayThree: req.body.todayThree,
    }
  ).then((updatedEntry) => {
    res.json(updatedEntry);
  });
});

router.delete("/:entry", (req, res) => {
  Positive.findOneAndDelete({ _id: req.params.entry }).then((entryToDelete) => {
    res.json(entryToDelete);
  });
});

module.exports = router;
