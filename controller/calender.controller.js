const Calendar = require("../model/calender.model");
const { cloudinary } = require("../config/cloudinary");


// CREATE
exports.create = async (req, res) => {
  try {
    const { date } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF required" });
    }

    const calendar = new Calendar({
      date,
      pdfUrl: req.file.path,       // Cloudinary URL
      publicId: req.file.filename, // Cloudinary public_id
    });

    await calendar.save();

    res.status(201).json(calendar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCalender = async (req, res) => {
  const data = await Calendar.find().sort({ date: -1 });
  res.json(data);
};



// DELETE
exports.delete = async (req, res) => {
  try {
    const item = await Calendar.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    // Delete from Cloudinary
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId, {
        resource_type: "raw", // IMPORTANT for PDF
      });
    }

    // Delete from DB
    await Calendar.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};