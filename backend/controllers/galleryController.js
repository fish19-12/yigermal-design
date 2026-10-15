const Gallery = require("../models/Gallery");

const { cloudinary } = require("../config/cloudinary");

// ===============================
// UPLOAD GALLERY IMAGE
// ===============================

exports.uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload image",
      });
    }

    const gallery = await Gallery.create({
      title: req.body.title,

      category: req.body.category,

      price: req.body.price,

      description: req.body.description,

      imageUrl: req.file.path,

      publicId: req.file.filename,
    });

    res.status(201).json({
      message: "Gallery uploaded successfully",

      gallery,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET ALL GALLERY
// ===============================

exports.getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET BY CATEGORY
// ===============================

exports.getGalleryByCategory = async (req, res) => {
  try {
    const images = await Gallery.find({
      category: req.params.category,
    }).sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// DELETE IMAGE
// ===============================

exports.deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({
        message: "Gallery image not found",
      });
    }

    // remove cloudinary image

    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await Gallery.findByIdAndDelete(id);

    res.json({
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: "Failed deleting image",
    });
  }
};
