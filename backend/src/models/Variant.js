const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Variant = sequelize.define("Variant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  variantSlug: { type: DataTypes.STRING, allowNull: false }, // "256gb-orange"
  storage: { type: DataTypes.STRING },
  color: { type: DataTypes.STRING },
  mrp: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "variants",
  timestamps: true
});

module.exports = Variant;