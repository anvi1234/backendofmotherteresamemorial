const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ✅ Banner Storage (Image only)
const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "banners",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});


// ✅ Academic Storage (Image + Video)
const academicStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: "academic",
      resource_type: isVideo ? "video" : "image",
    };
  },
});



const EventStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const CalenderStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "calender",
    allowed_formats: ["pdf"],
  },
});

const PopupStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "popup",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

module.exports = {
  cloudinary,
  bannerStorage,
  academicStorage,
  EventStorage,
  CalenderStorage,
  PopupStorage
};