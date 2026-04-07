const express = require('express');
const router = express.Router();
const multer = require('multer');

const { ResumeStorage } = require('../config/cloudinary');

const uploadResume = multer({ storage: ResumeStorage });
const controller = require("../controller/contact.controller");
// ✅ same API for both forms
router.post('/', uploadResume.single('resume'), controller.contactHandler);

module.exports = router;