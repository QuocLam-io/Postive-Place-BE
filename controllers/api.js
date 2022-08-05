const express = require("express");
const router = express.Router();
const positiveRouter = require("./positive")
const negativeRouter = require("./negative")

const authenticator = (req, res, next) => {
  console.log(req.session, "logging my life away");
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.use(authenticator);
router.use("/positive", positiveRouter);
router.use("/negative", negativeRouter);

module.exports = router;