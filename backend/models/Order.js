const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    items: [
      {
        title: String,

        image: String,

        price: String,

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    measurements: {
      shoulder: String,

      sleeve: String,

      bust: String,

      waist: String,

      hips: String,

      gownLength: String,

      waistHem: String,
    },

    payment: {
      method: String,

      number: String,

      accountName: String,

      amount: Number,

      screenshot: String,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,

      default: "Pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", OrderSchema);
