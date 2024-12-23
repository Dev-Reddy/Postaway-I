import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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
