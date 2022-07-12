const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const bcyrpt = require("bcrypt");

// function capitalize(name){
//   if (typeof name !== 'string') name = '';
//   return name.charAt(0).toUpperCase() + name.substring(1);
// }

function hashing(password) {
  const salt = bcyrpt.genSaltSync(10);
  return bcyrpt.hashSync(password, salt);
}

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    set: hashing,
    required: true,
    select: false,
  },
  positives:[{
    type: Schema.Types.ObjectId,
    ref: "Positive",
  }],
  negatives:[{
    type: Schema.Types.ObjectId,
    ref: "Negative",
  }]
});

module.exports = mongoose.model("User", User);
