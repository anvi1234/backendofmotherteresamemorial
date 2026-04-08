const Academic = require("../model/academic.model");
const { cloudinary } = require("../config/cloudinary");

// CREATE Academic (image/video upload)
exports.createAcademic = async (req, res) => {
  try {
    const { month, year } = req.body;

    if (!req.files || !req.files.length) {
      return res.status(400).json({ message: "Media files are required" });
    }

    // ✅ Prepare all media
    const newMedia = req.files.map((file, index) => {
      const isVideo = file.mimetype.startsWith("video");

      return {
        mediaUrl: file.path,
        publicId: file.filename,
        mediaType: isVideo ? "video" : "image",
        position: index + 1 // auto position
      };
    });

    let academic = await Academic.findOne({ month, year });

    if (academic) {
      // 👉 push multiple
      academic.media.push(...newMedia);
      await academic.save();
    } else {
      academic = await Academic.create({
        month,
        year,
        media: newMedia
      });
    }

    res.status(201).json({
      success: true,
      data: academic
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET all (filter by month/year optional)

exports.getAcademics = async (req, res) => {
  try {
    const data = await Academic.find()
      .sort({ year: -1, month: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: data.length,
      data
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



exports.deleteMedia = async (req, res) => {
  try {
    const { id, mediaId } = req.params;

    const academic = await Academic.findById(id);

    if (!academic) {
      return res.status(404).json({ message: "Record not found" });
    }

    const mediaItem = academic.media.id(mediaId);

    if (!mediaItem) {
      return res.status(404).json({ message: "Media not found" });
    }

    // ✅ Delete from Cloudinary
    if (mediaItem.publicId) {
      if (mediaItem.mediaType === "video") {
        await cloudinary.uploader.destroy(mediaItem.publicId, {
          resource_type: "video"
        });
      } else {
        await cloudinary.uploader.destroy(mediaItem.publicId);
      }
    }

    // ✅ Remove from DB
    academic.media.pull(mediaId);
    await academic.save();

    res.status(200).json({
      success: true,
      data: academic
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