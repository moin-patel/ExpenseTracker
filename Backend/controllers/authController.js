// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Generate JWT Token
// const generateToken = (id) => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error("JWT_SECRET is not defined in .env");
//   }
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // REGISTER USER
// const registerUser = async (req, res) => {
//   try {
//     const body = req.body || {};
//     const { fullName, email, password, profileImageUrl = "" } = body;

//     if (!fullName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "This email is already registered" });
//     }

//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       profileImageUrl,
//     });

//     return res.status(201).json({
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       profileImageUrl: user.profileImageUrl,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);

//     if (error.code === 11000) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     return res.status(500).json({ message: error.message || "Server error" });
//   }
// };

// // LOGIN USER
// const loginUser = async (req, res) => {
//   try {
//     const body = req.body || {};
//     const { email, password } = body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     return res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       profileImageUrl: user.profileImageUrl,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     return res.status(500).json({ message: error.message || "Server error" });
//   }
// };

// const getUserInfo = async (req, res) => {
//   try {
//     // ❌ user.findById ❌
//     // ✅ User.findById ✅
//     const user = await User.findById(req.user.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     console.error("GET USER ERROR:", err);
//     res.status(500).json({
//       message: "Error fetching user info",
//       error: err.message,
//     });
//   }
// };

// module.exports = { registerUser, loginUser, getUserInfo };

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Generate JWT Token
// const generateToken = (id) => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error("JWT_SECRET is not defined");
//   }
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // REGISTER USER
// const registerUser = async (req, res) => {
//   try {
//     const { fullName, email, password, profileImageUrl = "" } = req.body;

//     if (!fullName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "This email is already registered" });
//     }

//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       profileImageUrl,
//     });

//     return res.status(201).json({
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       profileImageUrl: user.profileImageUrl,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // LOGIN USER
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     return res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       profileImageUrl: user.profileImageUrl,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { registerUser, loginUser };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, profileImageUrl = "" } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADD THIS FUNCTION
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info" });
  }
};

// ✅ EXPORT ALL FUNCTIONS
module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
