
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const generateTrackingId = require("../helpers/generateTrackingId");

router.post("/place-order", async (req, res) => {
  try {
    const { userId, products } = req.body;
    const newOrder = new Order({ user: userId, products, trackingId: generateTrackingId() });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order" });
  }
});

router.get("/track/:trackingId", async (req, res) => {
  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId }).populate("products");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order" });
  }
});

module.exports = router;
    