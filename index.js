const express = require("express");
const app = express();

const parser = require("body-parser");
const cors = require("cors");

//MiddleWare
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

app.listen(3001, () => console.log("I'm not serving anything but I'm alive"));
