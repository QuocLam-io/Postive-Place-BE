const express = require("express");
const router = express.Router();

const Positive = require("../models/Positive");

router.get("/", (req, res) => {
  Positive.find({user: req.session.userId})
    // .populate("positives")
    .then((positiveEntries) => {
      console.log(positiveEntries);
      res.json(positiveEntries);
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  Positive.create({
    todayOne: req.body.todayOne,
    todayTwo: req.body.todayTwo,
    todayThree: req.body.todayThree,
    // generalOne: req.body.generalOne,
    // generalTwo: req.body.generalTwo,
    // generalThree: req.body.generalThree,
    day: new Date().getTime(),
    user: req.session.userId,
  }).then((newEntry) => {
    // console.log(newEntry);
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
      // generalOne: req.body.generalOne,
      // generalTwo: req.body.generalTwo,
      // generalThree: req.body.generalThree,
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
