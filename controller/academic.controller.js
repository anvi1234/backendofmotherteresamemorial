const Academic = require("../model/academic.model");
const { cloudinary } = require("../config/cloudinary");

// CREATE Academic (image/video upload)
exports.createAcademic = async (req, res) => {
  try {
    const { month, year,position } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Media file is required" });
    }

    const isVideo = req.file.mimetype.startsWith("video");

    const academic = new Academic({
      mediaUrl: req.file.path,
      publicId: req.file.filename,
      mediaType: isVideo ? "video" : "image",
      month,
      year,
      position
    });

    await academic.save();

    res.status(201).json({
      success: true,
      data: academic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all (filter by month/year optional)
exports.getAcademics = async (req, res) => {
  try {
    const { month, year } = req.query;

    let filter = {};
    if (month) filter.month = Number(month);
    if (year) filter.year = Number(year);

    const academics = await Academic.find(filter).sort({
      year: -1,
      month: -1,
    });

    res.json({
      success: true,
      data: academics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single
exports.getAcademicById = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);

    if (!academic) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({
      success: true,
      data: academic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateAcademic = async (req, res) => {
  try {
    const { month, year } = req.body;

    const academic = await Academic.findById(req.params.id);

    if (!academic) {
      return res.status(404).json({ message: "Data not found" });
    }

    // If new file uploaded → delete old one
    if (req.file) {
      if (academic.publicId) {
        await cloudinary.uploader.destroy(academic.publicId, {
          resource_type:
            academic.mediaType === "video" ? "video" : "image",
        });
      }

      const isVideo = req.file.mimetype.startsWith("video");

      academic.mediaUrl = req.file.path;
      academic.publicId = req.file.filename;
      academic.mediaType = isVideo ? "video" : "image";
    }

    if (month) academic.month = month;
    if (year) academic.year = year;

    await academic.save();

    res.json({
      success: true,
      data: academic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteAcademic = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);

    if (!academic) {
      return res.status(404).json({ message: "Data not found" });
    }

    if (academic.publicId) {
      await cloudinary.uploader.destroy(academic.publicId, {
        resource_type:
          academic.mediaType === "video" ? "video" : "image",
      });
    }

    await academic.deleteOne();

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};