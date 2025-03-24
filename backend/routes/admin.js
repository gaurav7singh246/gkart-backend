
const express = require("express");
const router = express.Router();
const Salesman = require("../models/Salesman");

// Verify Salesman
router.put("/verify-salesman/:id", async (req, res) => {
  try {
    const salesman = await Salesman.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    if (!salesman) return res.status(404).json({ message: "Salesman not found" });
    res.json({ message: "Salesman verified successfully", salesman });
  } catch (error) {
    res.status(500).json({ message: "Error verifying salesman" });
  }
});

// Remove Verification
router.put("/unverify-salesman/:id", async (req, res) => {
  try {
    const salesman = await Salesman.findByIdAndUpdate(req.params.id, { verified: false }, { new: true });
    if (!salesman) return res.status(404).json({ message: "Salesman not found" });
    res.json({ message: "Salesman verification removed", salesman });
  } catch (error) {
    res.status(500).json({ message: "Error removing verification" });
  }
});

module.exports = router;
