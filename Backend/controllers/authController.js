

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req,res)=>{

try{

const {
 fullName,
 email,
 password
}=req.body || {};


if(!fullName || !email || !password){

 return res.status(400).json({
  message:"All fields are required"
 });

}


const existingUser = await User.findOne({
 email
});


if(existingUser){

 return res.status(400).json({
  message:"Email already registered"
 });

}



let profileImageUrl="";


if(req.file){

 profileImageUrl =
 `/uploads/${req.file.filename}`;

}



const user = await User.create({

 fullName,
 email,
 password,
 profileImageUrl

});



res.status(201).json({

 _id:user._id,
 fullName:user.fullName,
 email:user.email,
 profileImageUrl:user.profileImageUrl,
 token:generateToken(user._id)

});


}
catch(error){

console.log(error);

res.status(500).json({
 message:"Server error"
});

}

}

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
 

const fs = require("fs");
const path = require("path");

const updateProfile = async (req, res) => {

  console.log("BODY:",req.body);

console.log("FILE:",req.file);
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.fullName = req.body.fullName || user.fullName;

    if (req.file) {
      if (user.profileImageUrl) {
        const oldImage = path.join(
          __dirname,
          "..",
          user.profileImageUrl.replace(/^\/+/, "")
        );

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      user.profileImageUrl = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ✅ EXPORT ALL FUNCTIONS
module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfile,
};
