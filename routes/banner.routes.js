const express = require("express");
const router = express.Router();
const multer = require("multer");
const { bannerStorage } = require("../config/cloudinary");

const uploadBanner = multer({ storage: bannerStorage });

const bannerController = require("../controller/banner.controller");

// Create
router.post("/", uploadBanner.single("image"), bannerController.createBanner);

// Get All
router.get("/", bannerController.getBanners);

// Get One
router.get("/:id", bannerController.getBannerById);

// Update


// Delete
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;