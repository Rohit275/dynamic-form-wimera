const express = require("express");
const mongoose = require("mongoose");

const ObjectId = require('mongodb').ObjectId;

var app = require("../app");
const forms = require("../models/forms");
const Users = require("../models/users");

const router = express.Router();

router.post("/addform", (req, res, next) => {
  // console.log(req.body);
  let data = new forms({
    formName: req.body.name,
    field: req.body.fields,
    category: req.body.category,
    subCategory: req.body.subcategory
  });

  data.save().then((form) => {
    // console.log(form);
    res.status(201).json({
      message: "Form added succesfully!",
      id: form._id,
      form: form,
    });
  });
});

router.post("/getforms", (req, res, next) => {
  console.log('category: ', req.body.category)
  console.log('subcategory: ', req.body.subcategory)

  cat = new ObjectId(req.body.category._id)
  subcat = new ObjectId(req.body.subcategory._id)

  // console.log("cat",cat)

  Users.findOne({ _id: req.body.id })
    .populate("forms")
    .then((user) => {
      if (user) {
        forms.find({category: cat, subCategory: subcat}).then((value) => {
          if (value) {
            // console.log('Found', value)
            return res
            .status(200)
            .json({ message: "Forms Fetched Successfully", user: value });
          } else {
            console.log('Not Found', value)
          }
        })

      } else {
        console.log('Not Found')
        return res.status(404).json({ message: "User Notfound" });
      }
    });
});

router.put("/updateform/:id", (req, res, next) => {
  //console.log("In updateform :", req.body, req.params.id);
  Users.updateOne(
    { _id: req.params.id },
    {
      $addToSet: { forms: req.body },
    }
  ).then((result) => {
    console.log("Update succesful!");
    res.status(200).json({ message: "Update succesful!" });
  });
});

module.exports = router;
