const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Negative = new Schema({
  todayOne: String,
  todayTwo: String,
  todayThree: String,
  // day: Date,
  day: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Negative", Negative);
