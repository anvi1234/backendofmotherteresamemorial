const Banner = require("../model/banner.model");
const { cloudinary } = require("../config/cloudinary");

// CREATE Banner
exports.createBanner = async (req, res) => {
  try {
    const { position } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const banner = new Banner({
      imageUrl: req.file.path,
      publicId: req.file.filename,
      position,
    });

    await banner.save();

    res.status(201).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ position: 1 });

    res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single banner
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE banner
exports.updateBanner = async (req, res) => {
  try {
    const { position } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // If new image uploaded → delete old image
    if (req.file) {
      if (banner.publicId) {
        await cloudinary.uploader.destroy(banner.publicId);
      }

      banner.imageUrl = req.file.path;
      banner.publicId = req.file.filename;
    }

    if (position !== undefined) {
      banner.position = position;
    }

    await banner.save();

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    if (banner.publicId) {
      await cloudinary.uploader.destroy(banner.publicId);
    }

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Banner deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};