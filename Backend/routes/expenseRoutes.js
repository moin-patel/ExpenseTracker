const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expenseController");

const protect = require("../middlewares/AuthMiddleware");

const router = express.Router();

// Add income
router.post("/add", protect, addExpense);

// Get all income of logged-in user
router.get("/get",protect , getAllExpense);

// Download income excel ✅ FIXED
router.get("/downloadexcel", protect, downloadExpenseExcel);

// Delete income
router.delete("/:id", deleteExpense);

module.exports = router;
