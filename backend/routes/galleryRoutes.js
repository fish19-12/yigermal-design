const express = require("express");
const router = express.Router();

const multer = require("multer");

const { storage } = require("../config/cloudinary");

const upload = multer({
  storage,
});

const {
  uploadGalleryImage,

  getGalleryImages,

  getGalleryByCategory,

  deleteGalleryImage,
} = require("../controllers/galleryController");

// Upload gallery image

router.post("/", upload.single("image"), uploadGalleryImage);

// Get all gallery

router.get("/", getGalleryImages);

// Get category collection

router.get("/category/:category", getGalleryByCategory);

// Delete

router.delete("/:id", deleteGalleryImage);

module.exports = router;
