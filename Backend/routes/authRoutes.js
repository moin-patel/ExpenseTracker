const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const protect = require("../middlewares/AuthMiddleware");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/getUser", protect, getUserInfo);
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no files uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
