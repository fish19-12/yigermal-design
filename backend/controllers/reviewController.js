const Review = require("../models/Review");
const { cloudinary } = require("../config/cloudinary");

// =========================
// CREATE REVIEW
// =========================

exports.addReview = async (req, res) => {
  try {
    let photoUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    let publicId = "";

    if (req.file) {
      photoUrl = req.file.path;

      publicId = req.file.filename;
    }

    const review = await Review.create({
      name: req.body.name,

      location: req.body.location,

      role: req.body.role,

      comment: req.body.comment,

      rating: Number(req.body.rating) || 5,

      photoUrl,

      publicId,
    });

    res.status(201).json(review);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed creating review",
    });
  }
};

// =========================
// GET REVIEWS
// =========================

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      approved: true,
    }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// DELETE REVIEW
// =========================

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.publicId) {
      await cloudinary.uploader.destroy(review.publicId);
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};
