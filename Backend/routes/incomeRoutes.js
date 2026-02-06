const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController");

const protect = require("../middlewares/AuthMiddleware");

const router = express.Router();

// Add income
router.post("/add", protect, addIncome);

// Get all income of logged-in user
router.get("/get", protect , getAllIncome);

// Download income excel ✅ FIXED
router.get("/downloadexcel", protect, downloadIncomeExcel);


// Delete income
router.delete("/:id", deleteIncome);

module.exports = router;
