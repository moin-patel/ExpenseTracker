const express = require("express");
const router = express.Router();

const { getDashboardData } = require("../controllers/dashboardController");
const protect = require("../middlewares/AuthMiddleware");

// GET dashboard data
router.get("/", protect, getDashboardData);

module.exports = router;
