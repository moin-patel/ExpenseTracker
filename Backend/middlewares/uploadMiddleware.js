
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
   
  }
};

module.exports = multer({
  storage,
  fileFilter,
});

// const multer = require("multer");

// const storage = multer.diskStorage({

//   destination:(req,file,cb)=>{
//     cb(null,"uploads/");
//   },

//   filename:(req,file,cb)=>{
//     cb(null,Date.now()+"-"+file.originalname);
//   }

// });


// const upload = multer({
//   storage:storage
// });


// module.exports = upload;