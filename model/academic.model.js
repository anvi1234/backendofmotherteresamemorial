const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema(
  {
    mediaUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    month: {
      type: Number, // 1 - 12
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    position:{
       type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Academic", academicSchema);