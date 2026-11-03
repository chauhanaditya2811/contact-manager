const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true, maxlength: 80 },
    email: {
      type: String, trim: true, lowercase: true, default: "",
      match: [/^$|^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
    phone: {
      type: String, required: [true, "Phone is required"], trim: true,
      match: [/^[+\d][\d\s\-()]{5,19}$/, "Enter a valid phone number"],
    },
    company: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "", maxlength: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
