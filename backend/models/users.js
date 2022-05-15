const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }],
});

module.exports = mongoose.model("User", userSchema);
