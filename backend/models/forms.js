const mongoose = require("mongoose");

const Form = mongoose.Schema({
  formName: { type: String, required: true, unique: true },
  field: [],
  category: { type: mongoose.Schema.Types.ObjectId },
  subCategory: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("Form", Form);
