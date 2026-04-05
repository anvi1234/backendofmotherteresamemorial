const express = require("express");
const router = express.Router();
const multer = require("multer");
const { academicStorage } = require("../config/cloudinary");

const updateAcademic = multer({ storage: academicStorage });

const academicController = require("../controller/academic.controller");

// Create
router.post("/", updateAcademic.single("image"), academicController.createAcademic);

// Get All
router.get("/", academicController.getAcademics);

// Get One
router.get("/:id", academicController.getAcademicById);

// Update


// Delete
router.delete("/:id", academicController.deleteAcademic);

module.exports = router;