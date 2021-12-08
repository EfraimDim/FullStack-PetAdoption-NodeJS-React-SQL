"use strict";

var multer = require('multer');

var path = require('path');

var storage = multer.diskStorage({
  destination: "../frontend/src/images",
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.originalname, "-").concat(Date.now()).concat(path.extname(file.originalname)));
  }
});
module.exports = {
  storage: storage
};