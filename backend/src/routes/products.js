const express = require("express");
const router = express.Router();
const { Product, Variant, EmiPlan } = require("../models/index");

// GET /api/products - list all products with their variants
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Variant,
        as: "variants",
        include: { model: EmiPlan, as: "emiPlans" }
      }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:slug - single product by slug
router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug },
      include: {
        model: Variant,
        as: "variants",
        include: { model: EmiPlan, as: "emiPlans" }
      }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;