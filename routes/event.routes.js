const express = require("express");
const multer = require("multer");
const router = express.Router();
const { EventStorage } = require("../config/cloudinary");

const uploadEvent = multer({ storage: EventStorage });
const controller = require("../controller/event.controller");

router.post("/", uploadEvent.single("image"), controller.createEvent);
router.get("/", controller.getEvents);
router.delete("/:id", controller.deleteEvent);

module.exports = router;