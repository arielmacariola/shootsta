const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

const uploadDirName = "uploads";

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDirName + "/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.json());

// Enable CORS for only for DEV purpose
app.use(cors());

// Setup root Endpoint
app.get("/", (req, res) => {
  res.send("Hello from Shootsta! This is our API root endpoint.");
});

app.get("/api/videos", (req, res) => {
  const allowed_filetypes = [".mp4", ".avi", ".flv", ".mov", ".wmv"];

  // Joining path of directory
  const directoryPath = path.join(__dirname, uploadDirName);

  fs.readdir("./" + uploadDirName, function(err, files) {
    // Handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    // Return files of allowed video type only
    const result = files.filter(file => {
      let ext = path.extname(file);
      if (allowed_filetypes.includes(ext)) return true;
    });
    res.send(result);
  });
});

app.post("/api/videos", upload.array("video", 12), function(req, res, next) {
  res.send(req.files);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
