// controllers/gallery.controller.js
const Gallery = require("../model/popup.model");
const { cloudinary } = require("../config/cloudinary");

// CREATE
exports.create = async (req, res) => {
  try {
    const { isShow } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const gallery = new Gallery({
      imageUrl: req.file.path,
      publicId: req.file.filename,
      isShow: isShow === 'true' || isShow === true
    });

    await gallery.save();

    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const data = await Gallery.find().sort({ createdAt: -1 });
  res.json(data);
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (item?.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};