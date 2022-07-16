const express = require("express");
const router = express.Router();
const moment = require("moment");

const Negative = require("../models/Negative");

router.get("/", (req, res) => {
  Negative.find({user: req.session.userId})
    .then((negativeEntries) => {
      console.log(negativeEntries);
      res.json(negativeEntries);
    })
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res)=>{
  Negative.findById(req.params.id)
    .then((negativeEntry)=>{
      res.json(negativeEntry);
    })
    .catch((error)=>console.log(error));
})

router.post("/", (req, res) => {
  Negative.create({
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
  Negative.findOneAndUpdate(
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
  Negative.findOneAndDelete({ _id: req.params.entry }).then((entryToDelete) => {
    res.json(entryToDelete);
  });
});

module.exports = router;
