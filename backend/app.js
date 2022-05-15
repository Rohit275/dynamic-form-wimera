const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const formRoutes = require("./routes/forms");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");

const app = express();
var cors = require("cors");

app.use(cors());
const conn = mongoose
  .connect("mongodb://localhost/Dynamic-Form")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to Mongo DB...", err));
//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/forms", formRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

module.exports = app;
