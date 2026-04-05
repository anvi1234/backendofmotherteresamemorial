const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Calendar", calendarSchema);