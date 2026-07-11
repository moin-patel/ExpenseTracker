
const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfile,
} = require("../controllers/authController");

const protect = require("../middlewares/AuthMiddleware");


// Register with image
router.post(
  "/register",
  upload.single("profileImage"),
  registerUser
);


router.post("/login", loginUser);


router.get(
  "/getUser",
  protect,
  getUserInfo
);


router.put(
  "/update-profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);


module.exports = router;