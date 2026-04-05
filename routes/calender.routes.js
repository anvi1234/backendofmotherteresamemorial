const express = require("express");
const multer = require("multer");
const router = express.Router();
const { CalenderStorage } = require("../config/cloudinary");

const uploadCalendar = multer({ storage: CalenderStorage });

const controller = require("../controller/calender.controller");

router.post("/", uploadCalendar.single("file"), controller.create);
router.get("/", controller.getCalender);
router.delete("/:id", controller.delete);

module.exports = router;