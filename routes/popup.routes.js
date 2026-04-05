const express = require("express");
const router = express.Router();
const {PopupStorage } = require("../config/cloudinary");
const multer = require("multer");
const uploadPopup = multer({ storage: PopupStorage });
const controller = require("../controller/popup.controller");

router.post("/", uploadPopup.single("image"), controller.create);
router.get("/", controller.getAll);
router.delete("/:id", controller.delete);

module.exports = router;