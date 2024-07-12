var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');

var NewsRouter = express.Router();
// 图片上传
const multer = require('multer');
const upload = multer({ dest: 'public/newsuploads/' });
NewsRouter.post("/adminapi/news/add", upload.single("file"), NewsController.add)
module.exports = NewsRouter;