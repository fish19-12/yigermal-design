const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Women",
        "Men",
        "Couples",
        "Family",
        "Children",
        "Bridal",
        "Chiffon",
        "Modern",
        "Textile",
        "Traditional",
      ],
    },

    price: {
      type: String,
      default: "Contact for price",
    },

    description: {
      type: String,
      default: "Habesha clothing designed by Yigermal Design.",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Gallery", GallerySchema);
