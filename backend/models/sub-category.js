const mongoose = require("mongoose");

const SubCategory = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  sub_category_name: { type: String },
});

module.exports = mongoose.model("SubCategory", SubCategory);
