const mongoose = require("mongoose");

mongoose.Promise = Promise;

let mongoURI = "";
if (process.env.ENVIRONMENT === "production") {
  mongoURI = process.env.MONGODB_URI;
} else {
  mongoURI = "mongodb://localhost/positive-place_db";
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then((instance) =>
    console.log(`Connected to db: ${instance.connection[0].name}`)
  )
  .catch((err) => console.log(err));


module.exports = mongoose;
