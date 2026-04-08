const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  mediaUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true
  },
  position: {
    type: Number,
    default: 0
  }
}, { _id: true }); // each media will have its own _id

const academicSchema = new mongoose.Schema(
  {
    month: {
      type: Number, // 1–12
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    media: [mediaSchema] // 👈 array of images/videos
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate month-year records
academicSchema.index({ month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("Academic", academicSchema);