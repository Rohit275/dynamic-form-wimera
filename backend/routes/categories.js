const express = require("express");
const Category = require("../models/category");
const SubCategory = require("../models/sub-category")

const router = express.Router();

router.get("/getCategory", (req, res, next) => {
  Category.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Fetched succesfully",
      category: documents,
    });
  });
});

router.post("/getSubCategory", (req, res, next) => {
  // console.log("post getSubCategory")
  let cat = req.body.category
  console.log(cat)

  // SubCategory.find()

  SubCategory.find({category: cat}).then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Fetched succesfully",
      subCategory: documents,
    });
  });
});

router.post("/addCategory", (req, res, next) => {
  console.log(req.body);

  let data = new Category({
    category_name: req.body.name,
  });

  data.save().then((category) => {
    console.log(category);
    res.status(201).json({
      message: "Category added succesfully!",
      category: category,
    });
  });
});

router.post("/addSubCategory", (req, res, next) => {
  console.log(req.body);

  let data = new SubCategory({
    sub_category_name: req.body.name,
    category: req.body.category
  });

  data.save().then((category) => {
    console.log(category);
    res.status(201).json({
      message: "Sub-Category added succesfully!",
      category: category,
    });
  });
});



module.exports = router;
