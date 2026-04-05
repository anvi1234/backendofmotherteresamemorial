// models/gallery.model.js
const mongoose = require("mongoose");

const popUpSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Popup", popUpSchema);