const sequelize = require("../config/db");
const Product = require("./Product");
const Variant = require("./Variant");
const EmiPlan = require("./EmiPlan");

// One product has many variants
Product.hasMany(Variant, { foreignKey: "productId", as: "variants", onDelete: "CASCADE" });
Variant.belongsTo(Product, { foreignKey: "productId" });

// One variant has many EMI plans
Variant.hasMany(EmiPlan, { foreignKey: "variantId", as: "emiPlans", onDelete: "CASCADE" });
EmiPlan.belongsTo(Variant, { foreignKey: "variantId" });

module.exports = { sequelize, Product, Variant, EmiPlan };