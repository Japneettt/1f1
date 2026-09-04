const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

// Serve images and other static files from the public folder
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("1Fi EMI App API is running");
});

module.exports = app;