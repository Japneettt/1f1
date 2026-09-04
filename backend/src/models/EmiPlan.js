const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EmiPlan = sequelize.define("EmiPlan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tenureMonths: { type: DataTypes.INTEGER, allowNull: false },
  monthlyAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  interestRate: { type: DataTypes.DECIMAL(4, 2), allowNull: false }, // e.g. 10.50
  cashback: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 }
}, {
  tableName: "emi_plans",
  timestamps: true
});

module.exports = EmiPlan;