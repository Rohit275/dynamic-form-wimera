const express = require("express");
const mongoose = require("mongoose");
var app = require("../app");

const Users = require("../models/users");
const Form = require("../models/forms");

const router = express.Router();

router.post("/login", (req, res, next) => {
  // console.log(req.body);

  Users.findOne({
    Username: req.body.username,
    Password: req.body.password,
  }).then((user) => {
    // console.log(user);
    if (user) {
      return res.status(200).json({ message: "Login Success", user: user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
});

// router.post("/getforms", (req, res, next) => {
//   let cat_id = req.body.category._id;
//   Users.findOne({ _id: req.body.id })
//     .populate("forms")
//     .then((user) => {
//       if (user) {
//         // Form.findById(cat_id).then((document) => {

//         // })
//         return res
//           .status(200)
//           .json({ message: "Forms Fetched Successfully", user: user });
//       } else {
//         return res.status(404).json({ message: "User Notfound" });
//       }
//     });
// });

// router.put("/updateform/:id", (req, res, next) => {
//   //console.log("In updateform :", req.body, req.params.id);
//   Users.updateOne(
//     { _id: req.params.id },
//     {
//       $addToSet: { forms: req.body },
//     }
//   ).then((result) => {
//     console.log("Update succesful!");
//     res.status(200).json({ message: "Update succesful!" });
//   });
// });

module.exports = router;
