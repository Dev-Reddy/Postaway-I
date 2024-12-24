import multer from "multer";

// Multer configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // the path is relative to the root of the project where the server is running
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.floor(Math.random() * 10000000) +
        file.originalname
    );
  },
});

export const upload = multer({ storage: storage });
