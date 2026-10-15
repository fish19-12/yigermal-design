const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  deleteOrder,
  uploadPayment,
} = require("../controllers/orderController");

router.post("/", uploadPayment, createOrder);

router.get("/", getOrders);

router.delete("/:id", deleteOrder);

module.exports = router;
