const Event = require("../model/event.model");
const { cloudinary } = require("../config/cloudinary");

// CREATE
exports.createEvent = async (req, res) => {
  try {
    const { eventName, day, date } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const event = new Event({
      eventName,
      imageUrl: req.file.path,
      publicId: req.file.filename,
      day,
      date,
    });

    await event.save();

    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getEvents = async (req, res) => {
  const data = await Event.find().sort({ date: -1 });
  res.json(data);
};

// DELETE
exports.deleteEvent = async (req, res) => {
  try {
    // 1. Find event
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2. Delete from Cloudinary
    if (event.publicId) {
      await cloudinary.uploader.destroy(event.publicId);
    }

    // 3. Delete from DB
    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};