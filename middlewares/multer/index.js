const multer = require("multer");
const fs = require("fs");
const path = require("path");

const fileSizeLimit = 2 * 1024 * 1024;

function createDestinationFolderIfNotExists(folderPath, cb) {
  const absoluteFolderPath = path.join(__dirname, "../../", folderPath);

  fs.mkdir(absoluteFolderPath, { recursive: true }, (err) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, folderPath);
    }
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "idProof") {
      createDestinationFolderIfNotExists("uploads/idProofs/", cb);
    } else if (file.fieldname === "profilePic") {
      createDestinationFolderIfNotExists("uploads/profilePic/", cb);
    } else {
      createDestinationFolderIfNotExists("uploads/assets/", cb);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileSizeLimit,
  },
  fileFilter: function (req, file, cb) {
    if (file.size > fileSizeLimit) {
      cb(new Error("File too large. Max file size is 3MB"), false);
    } else {
      cb(null, true);
    }
  },
});

module.exports = upload;
