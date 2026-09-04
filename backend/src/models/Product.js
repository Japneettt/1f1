const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  brand: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  specs: { type: DataTypes.JSONB, defaultValue: {} } // e.g. { "Screen Size": "6.3 inch", ... }
}, {
  tableName: "products",
  timestamps: true
});

module.exports = Product;