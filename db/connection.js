const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/positive-place_db",
    // { useUnifiedTopology: true },
  { useNewUrlParser: true }
);

mongoose.Promise = Promise;

module.exports = mongoose;
