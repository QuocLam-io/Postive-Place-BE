const express = require("express");
const router = express.Router();

const Negative = require("../models/Negative");

router.get("/", (req, res) => {
  Negative.find({user: req.session.userId})
    // .populate("positives")
    .then((negativeEntries) => {
      console.log(negativeEntries);
      res.json(negativeEntries);
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  Negative.create({
    todayOne: req.body.todayOne,
    todayTwo: req.body.todayTwo,
    todayThree: req.body.todayThree,
    // generalOne: req.body.generalOne,
    // generalTwo: req.body.generalTwo,
    // generalThree: req.body.generalThree,
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
      // generalOne: req.body.generalOne,
      // generalTwo: req.body.generalTwo,
      // generalThree: req.body.generalThree,
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
